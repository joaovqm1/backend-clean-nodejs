import faker from 'faker'
import request from 'supertest'
import FormData from 'form-data'

import { CreateDocumentResponseViewModel, CreateOfficeResponseViewModel, ReadOfficeResponseViewModel } from '@/presentation'
import { IntegrationTestRunner } from '@/test/utilities/integration-test-runner'
import { fileUtilities } from '@/main'
import { Document } from '@/infra/database/models/document'
import app from '@/main/config/app'

describe('CRUD Document', function() {
  const filesNames = ['file1', 'file2', 'file3', 'file4', 'file5', 'file6', 'file7', 'file8']

  async function createOrUpdateDocument(params: {
    office: CreateOfficeResponseViewModel,
    data: any,
    isUpdate?: boolean
  }): Promise<any> {
    const { office, data, isUpdate } = params

    const formData = new FormData()
    formData.append('file', fileUtilities.getReadStream(`${__dirname}/file.txt`))
    formData.append('description', data.description)

    const method = isUpdate ? 'put' : 'post'
    const url = isUpdate ? `/api/crud/documents/${data.id}` : '/api/crud/documents'

    const response = await request(app)[method](url)
      .set('x-access-token', office.user.token)
      .set('x-user-office-id', office.id.toString())
      .set('Content-Type', `multipart/form-data; boundary=${formData.getBoundary()}`)
      .field('description', faker.random.word())
      .attach('file', fileUtilities.getReadStream(`${__dirname}/${filesNames.pop()}.txt`))

    return response
  }

  const integrationTestRunner = new IntegrationTestRunner({
    feature: 'documents',
    createObjectCallback: createOrUpdateDocument,
    updateObjectCallback: createOrUpdateDocument,
    getObjectToCreate: getRandomCreateViewModel,
    getExpectedObject: getExpectedObject,
    uniqueErrorMessage: 'Já existe um documento cadastrado com esse nome',
    sequelizeModel: Document
  })

  async function getRandomCreateViewModel(
    params: { office: CreateOfficeResponseViewModel }
  ): Promise<{ viewModel: any }> {
    return {
      viewModel: {
        description: faker.database.column()
      }
    }
  }

  async function getExpectedObject(
    params: {
      responseViewModel: CreateDocumentResponseViewModel
      office: ReadOfficeResponseViewModel
    }
  ): Promise<CreateDocumentResponseViewModel> {
    const { responseViewModel, office } = params
    const officeIdentifier = `office_${office.id}`
    expect(responseViewModel.name).toContain('file')
    expect(responseViewModel.key).toContain(officeIdentifier)
    expect(responseViewModel.path).toContain(officeIdentifier)
    expect(responseViewModel.extension).toEqual('txt')
    expect(responseViewModel.mimeType).toEqual('text/plain')
    expect(typeof responseViewModel.size).toBeDefined()
    expect(typeof responseViewModel.size).toEqual('number')
    return {
      ...responseViewModel,
      description: responseViewModel.description.toUpperCase()
    }
  }

  integrationTestRunner.run()
})
