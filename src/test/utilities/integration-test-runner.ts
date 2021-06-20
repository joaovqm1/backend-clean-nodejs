/* eslint-disable @typescript-eslint/no-dynamic-delete */
/* eslint-disable @typescript-eslint/space-before-function-paren */
import request, { Request } from 'supertest'

import truncate from './truncate'
import app from '@/main/config/app'
import { createOffice } from './set-up'
import { CreateOfficeResponseViewModel } from '@/presentation'
import {
  checkCreatedObjectEqualsExpected,
  checkReceivedObjectEqualsExpected,
  checkUpdatedObjectEqualsExpected
} from './checker'

type Scenario = 'create' | 'readOne' | 'readMany' | 'update' | 'delete'
interface Params {
  feature: string
  createObjectCallback?: Function
  updateObjectCallback?: Function
  getObjectToCreate: Function
  getExpectedCreatedObject?: Function
  getExpectedUpdatedObject?: Function
  getExpectedObject: Function
  optionalFields?: string[]
  uniqueAttributes?: { [uniqueDescription: string]: string[] }
  uniqueErrorMessage?: string
  sequelizeModel: any
  shouldCheckUpdaterId?: boolean
  scenarios?: Scenario[]
}

export class IntegrationTestRunner {
  private readonly createObjectCallback?: Function
  private readonly updateObjectCallback?: Function
  private readonly officeName: string
  private readonly feature: string
  private office: CreateOfficeResponseViewModel
  private readonly endpoint: string
  private readonly getObjectToCreate: Function
  private readonly getExpectedCreatedObject: Function
  private readonly getExpectedUpdatedObject: Function
  private readonly getExpectedReadObject: Function
  private readonly optionalFields: string[]
  private readonly uniqueAttributesByDescription: { [uniqueDescription: string]: string[] }
  private readonly uniqueErrorMessage: string
  private readonly sequelizeModel: any
  private readonly shouldCheckUpdaterId: boolean = true
  private readonly scenarios: Scenario[]

  constructor(params: Params) {
    this.createObjectCallback = params.createObjectCallback
    this.updateObjectCallback = params.updateObjectCallback
    this.officeName = `${params.feature.toUpperCase()} OFFICE`
    this.feature = params.feature
    this.endpoint = `/api/crud/${this.feature}`
    this.getObjectToCreate = params.getObjectToCreate
    this.getExpectedCreatedObject = params.getExpectedObject || params.getExpectedCreatedObject
    this.getExpectedUpdatedObject = params.getExpectedUpdatedObject || params.getExpectedObject
    this.getExpectedReadObject = params.getExpectedObject
    this.optionalFields = params.optionalFields || []
    this.uniqueAttributesByDescription = params.uniqueAttributes
    this.uniqueErrorMessage = params.uniqueErrorMessage
    this.sequelizeModel = params.sequelizeModel

    if (params.shouldCheckUpdaterId === false) {
      this.shouldCheckUpdaterId = params.shouldCheckUpdaterId
    }

    if (params.scenarios) {
      this.scenarios = params.scenarios
    } else {
      this.scenarios = ['create', 'readOne', 'readMany', 'update', 'delete']
    }
  }

  run(): void {
    describe('Test Runner', () => {
      beforeAll(async () => {
        await truncate([this.officeName])
        this.office = await createOffice(this.officeName)
      })

      if (this.scenarios.includes('create')) {
        describe('Create', () => {
          it(`Should create a new object, with all attributes, when call POST /${this.feature}`, async () => {
            // Act
            const createParams = await this.getObjectToCreate({ office: this.office })
            const createRequestViewModel: any = createParams.viewModel
            const response = await this.createObject(createRequestViewModel)

            const createResponseViewModel: any = response.body.data

            if (response.status !== 200) {
              throw new Error(response.body.data)
            }

            const expectedCreateResponseViewModel: any = await this.getExpectedCreatedObject({
              responseViewModel: createResponseViewModel,
              office: this.office,
              metadata: createParams.metadata,
              requestViewModel: createParams.viewModel
            })

            // Assert
            expect(response.status).toBe(200)
            checkCreatedObjectEqualsExpected({
              receivedObject: createResponseViewModel,
              expectedObject: expectedCreateResponseViewModel
            })
          })

          if (this.optionalFields.length > 0) {
            it(`Should create a new object, with only required attributes, when call POST /${this.feature}`, async () => {
              const createParams = await this.getObjectToCreate({ office: this.office })
              const createRequestViewModel: any = createParams.viewModel

              for (const field of this.optionalFields) {
                delete createRequestViewModel[field]
              }

              // Act
              const response = await this.createObject(createRequestViewModel)

              if (response.status !== 200) {
                throw new Error(response.body.data)
              }

              const createResponseViewModel: any = response.body.data
              const expectedCreateResponseViewModel: any = await this.getExpectedCreatedObject({
                responseViewModel: createResponseViewModel,
                office: this.office,
                metadata: createParams.metadata,
                requestViewModel: createParams.viewModel
              })

              for (const field of this.optionalFields) {
                delete expectedCreateResponseViewModel[field]
              }

              // Assert
              expect(response.status).toBe(200)
              checkCreatedObjectEqualsExpected({
                receivedObject: createResponseViewModel,
                expectedObject: expectedCreateResponseViewModel
              })
            })
          }

          if (this.uniqueAttributesByDescription !== undefined) {
            for (const uniqueDescription in this.uniqueAttributesByDescription) {
              const uniqueAttributes = this.uniqueAttributesByDescription[uniqueDescription]
              it(`Should throw error when trying to create another object with the same ${uniqueAttributes.toString()}`, async () => {
                // Arrange
                const createParams = await this.getObjectToCreate({ office: this.office })
                const createRequestViewModel: any = createParams.viewModel
                let response = await this.createObject(createRequestViewModel)
                const createdResponseViewModel: any = response.body.data

                if (uniqueAttributes.length === 1) {
                  createRequestViewModel[uniqueAttributes[0]] = createdResponseViewModel[uniqueAttributes[0]]
                } else {
                  for (const uniqueAttribute of uniqueAttributes) {
                    createRequestViewModel[uniqueAttribute] = createdResponseViewModel[uniqueAttribute]
                  }
                }

                // Act
                response = await this.createObject(createRequestViewModel)

                // Assert
                expect(response.status).toBe(403)
                expect(response.body.data).toBe(this.uniqueErrorMessage)
              })
            }
          }
        })
      }

      describe('Read', () => {
        if (this.scenarios.includes('readOne')) {
          it(`Should receive the just created object when call GET /${this.feature}/id`, async () => {
            // Arrange
            const createParams = await this.getObjectToCreate({ office: this.office })
            const createRequestViewModel: any = createParams.viewModel
            const createResponseViewModel = (await this.createObject(createRequestViewModel)).body.data

            // Act
            const readResponse = await request(app)
              .get(`${this.endpoint}/id/${createResponseViewModel.id}`)
              .set('token', this.office.user.token)
              .set('officeId', this.office.id.toString())
              .send()

            // Assert
            expect(readResponse.status).toBe(200)

            const receivedViewModel: any = readResponse.body.data
            const expectedViewModel = this.getExpectedReadObject({
              responseViewModel: receivedViewModel,
              office: this.office,
              metadata: createParams.metadata,
              requestViewModel: createParams.viewModel
            })

            checkReceivedObjectEqualsExpected({
              receivedObject: receivedViewModel,
              expectedObject: expectedViewModel
            })
          })
        }
        if (this.scenarios.includes('readMany')) {
          it(`Should receive a list with the created object on int when call GET /${this.feature}`, async () => {
            // Arrange
            const createParams = await this.getObjectToCreate({ office: this.office })
            const createRequestViewModel: any = createParams.viewModel
            const createResponseViewModel = (await this.createObject(createRequestViewModel)).body.data

            // Act
            const readResponse = await request(app)
              .get(`${this.endpoint}`)
              .set('token', this.office.user.token)
              .set('officeId', this.office.id.toString())
              .send()

            // Assert
            expect(readResponse.status).toBe(200)

            const receivedViewModels: any[] = readResponse.body.data.items
            const expectedViewModel = this.getExpectedReadObject({
              responseViewModel: receivedViewModels.find(user => user.id === createResponseViewModel.id),
              office: this.office,
              metadata: createParams.metadata,
              requestViewModel: createParams.viewModel
            })

            checkReceivedObjectEqualsExpected({
              receivedObject: receivedViewModels.find(user => user.id === createResponseViewModel.id),
              expectedObject: expectedViewModel
            })
          })
        }
      })

      if (this.scenarios.includes('update')) {
        describe('Update', () => {
          it(`Should update the just created object when call PUT /${this.feature}/id`, async () => {
            // Arrange
            const createParams1 = await this.getObjectToCreate({ office: this.office })
            const createRequestViewModel1: any = createParams1.viewModel
            const createResponseViewModel1: any = (await this.createObject(createRequestViewModel1)).body.data

            const createParams2 = await this.getObjectToCreate({ office: this.office })

            const updateRequestViewModel: any = {
              id: createResponseViewModel1.id,
              ...createParams2.viewModel
            }

            // Act
            const response = this.updateObjectCallback ?
              await this.updateObjectCallback({
                office: this.office,
                data: updateRequestViewModel,
                isUpdate: true
              }) :
              await request(app)
                .put(`${this.endpoint}/${createResponseViewModel1.id}`)
                .set('token', this.office.user.token)
                .set('officeId', this.office.id.toString())
                .send({ data: updateRequestViewModel })

            // Assert

            if (response.status !== 200) {
              throw new Error(response.body.data)
            }

            expect(response.status).toBe(200)

            const receivedUpdateResponseViewModel = response.body.data
            const expectedUpdateResponseViewModel = await this.getExpectedUpdatedObject({
              responseViewModel: receivedUpdateResponseViewModel,
              office: this.office,
              metadata: createParams2.metadata,
              requestViewModel: createParams2.viewModel
            })

            checkUpdatedObjectEqualsExpected({
              receivedObject: receivedUpdateResponseViewModel,
              expectedObject: expectedUpdateResponseViewModel,
              checkUpdaterId: this.shouldCheckUpdaterId
            })
          })
        })
      }

      if (this.scenarios.includes('delete')) {
        describe('Delete', () => {
          it(`Should not be able to get object after call DELETE ${this.feature}/id`, async () => {
            // Arrange
            const createParams = await this.getObjectToCreate({ office: this.office })
            const createRequestViewModel: any = createParams.viewModel
            const createResponseViewModel: any = (await this.createObject(createRequestViewModel)).body.data

            // Act
            const response = await request(app)
              .delete(`${this.endpoint}/${createResponseViewModel.id}`)
              .set('token', this.office.user.token)
              .set('officeId', this.office.id.toString())
              .send()

            const object = await this.sequelizeModel.findOne({
              where: {
                id: createResponseViewModel.id
              }
            })

            // Assert
            expect(response.status).toBe(200)
            expect(response.body.data).toBe('Item removido com sucesso')
            expect(object).toBeNull()
          })
        })
      }
    })
  }

  async createObject(body: any): Promise<Request> {
    if (this.createObjectCallback) {
      return this.createObjectCallback({
        office: this.office,
        data: body
      })
    } else {
      const response = await request(app)
        .post(this.endpoint)
        .set('token', this.office.user.token)
        .set('officeId', this.office.id.toString())
        .send({
          data: body
        })

      return response
    }
  }
}
