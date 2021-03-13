/* eslint-disable @typescript-eslint/no-dynamic-delete */
/* eslint-disable @typescript-eslint/space-before-function-paren */
import request, { Request } from 'supertest'

import truncate from './truncate'
import app from '@/main/config/app'
import { createOffice } from './set-up'
import { CreateOfficeResponseViewModel } from '@/presentation'
import { checkCreatedObjectEqualsExpected, checkReceivedObjectEqualsExpected, checkUpdatedObjectEqualsExpected } from './checker'
import logger from '@/logger'

interface Params {
  feature: string
  getObjectToCreate: Function
  getExpectedCreatedObject?: Function
  getExpectedUpdatedObject?: Function
  getExpectedObject: Function
  optionalFields?: string[]
  uniqueAttributes?: { [uniqueDescription: string]: string[] }
  uniqueErrorMessage?: string
  sequelizeModel: any
  shouldCheckUpdaterId?: boolean
}

export class IntegrationTestRunner {
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

  constructor(params: Params) {
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
  }

  run(): void {
    describe('Test Runner', () => {
      beforeAll(async () => {
        await truncate([this.officeName])
        this.office = await createOffice(this.officeName)
      })

      describe('Create', () => {
        it(`Should create a new object, with all attributes, when call POST /${this.feature}`, async () => {
          // Act
          const response = await this.createObject()

          const createdResponseViewModel: any = response.body.data
          const expectedCreateResponseViewModel: any = this.getExpectedCreatedObject(createdResponseViewModel)

          if (response.status !== 200) {
            logger.error(response.body.data)
          }

          // Assert
          expect(response.status).toBe(200)
          checkCreatedObjectEqualsExpected({
            receivedObject: createdResponseViewModel,
            expectedObject: expectedCreateResponseViewModel
          })
        })

        it(`Should create a new object, with only required attributes, when call POST /${this.feature}`, async () => {
          const createRequestViewModel: any = await this.getObjectToCreate(this.office)

          for (const field of this.optionalFields) {
            delete createRequestViewModel[field]
          }

          // Act
          const response = await this.createObject(createRequestViewModel)

          if (response.status !== 200) {
            logger.error(response.body.data)
          }

          const createdResponseViewModel: any = response.body.data
          const expectedCreateResponseViewModel: any = this.getExpectedCreatedObject(createdResponseViewModel)

          for (const field of this.optionalFields) {
            delete expectedCreateResponseViewModel[field]
          }

          // Assert
          expect(response.status).toBe(200)
          checkCreatedObjectEqualsExpected({
            receivedObject: createdResponseViewModel,
            expectedObject: expectedCreateResponseViewModel
          })
        })

        if (this.uniqueAttributesByDescription !== undefined) {
          for (const uniqueDescription in this.uniqueAttributesByDescription) {
            const uniqueAttributes = this.uniqueAttributesByDescription[uniqueDescription]
            it(`Should throw error when trying to create another object with the same ${uniqueAttributes.toString()}`, async () => {
              // Arrange
              const createRequestViewModel: any = await this.getObjectToCreate(this.office)
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

      describe('Read', () => {
        it(`Should receive the just created object when call GET /${this.feature}/id`, async () => {
          // Arrange
          const createResponseViewModel = (await this.createObject()).body.data

          // Act
          const readResponse = await request(app)
            .get(`${this.endpoint}/id/${createResponseViewModel.id}`)
            .set('token', this.office.user.token)
            .set('officeId', this.office.id.toString())
            .send()

          // Assert
          expect(readResponse.status).toBe(200)

          const receivedViewModel: any = readResponse.body.data
          const expectedViewModel = this.getExpectedReadObject(createResponseViewModel)

          checkReceivedObjectEqualsExpected({
            receivedObject: receivedViewModel,
            expectedObject: expectedViewModel
          })
        })

        it(`Should receive a list with the created object on int when call GET /${this.feature}`, async () => {
          // Arrange
          const createResponseViewModel = (await this.createObject()).body.data

          // Act
          const readResponse = await request(app)
            .get(`${this.endpoint}`)
            .set('token', this.office.user.token)
            .set('officeId', this.office.id.toString())
            .send()

          // Assert
          expect(readResponse.status).toBe(200)

          const receivedViewModels: any[] = readResponse.body.data.items
          const expectedViewModel = this.getExpectedReadObject(createResponseViewModel)

          checkReceivedObjectEqualsExpected({
            receivedObject: receivedViewModels.find(user => user.id === createResponseViewModel.id),
            expectedObject: expectedViewModel
          })
        })
      })

      describe('Update', () => {
        it(`Should update the just created object when call PUT /${this.endpoint}/id`, async () => {
          // Arrange
          const createResponseViewModel: any = (await this.createObject()).body.data

          const updateRequestViewModel: any = {
            id: createResponseViewModel.id,
            ...(await this.getObjectToCreate(this.office))
          }

          // Act
          const response = await request(app)
            .put(`${this.endpoint}/${createResponseViewModel.id}`)
            .set('token', this.office.user.token)
            .set('officeId', this.office.id.toString())
            .send({ data: updateRequestViewModel })

          // Assert
          expect(response.status).toBe(200)

          const receivedUpdateResponseViewModel = response.body.data
          const expectedUpdateResponseViewModel = this.getExpectedUpdatedObject(receivedUpdateResponseViewModel)

          checkUpdatedObjectEqualsExpected({
            receivedObject: receivedUpdateResponseViewModel,
            expectedObject: expectedUpdateResponseViewModel,
            checkUpdaterId: this.shouldCheckUpdaterId
          })
        })
      })

      describe('Delete', () => {
        it(`Should not be able to get object after call DELETE ${this.endpoint}/id`, async () => {
          // Arrange
          const createResponseViewModel: any = (await this.createObject()).body.data

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
    })
  }

  async createObject(body?: any): Promise<Request> {
    const response = await request(app)
      .post(this.endpoint)
      .set('token', this.office.user.token)
      .set('officeId', this.office.id.toString())
      .send({
        data: body || await this.getObjectToCreate(this.office)
      })

    return response
  }
}
