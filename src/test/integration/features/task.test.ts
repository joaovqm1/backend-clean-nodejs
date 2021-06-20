import faker from 'faker'
import { IntegrationTestRunner } from '@/test/utilities/integration-test-runner'
import { Task } from '@/infra/database/models'
import { CreateOfficeResponseViewModel, CreateTaskRequestViewModel, CreateTaskResponseViewModel } from '@/presentation'
import { createUser } from '@/test/utilities/set-up'
import { TaskStatus } from '@/domain'

describe('CRUD Task', function() {
  const integrationTestRunner = new IntegrationTestRunner({
    feature: 'tasks',
    getObjectToCreate: getRandomCreateViewModel,
    getExpectedObject: getExpectedObject,
    uniqueErrorMessage: 'Já existe uma tarefa cadastrada com esse título',
    sequelizeModel: Task,
    optionalFields: ['description', 'finishDate', 'startTime', 'finishTime'],
    shouldCheckUpdaterId: false
  })

  async function getRandomCreateViewModel(params: { office: CreateOfficeResponseViewModel }): Promise<{ metadata: any, viewModel: CreateTaskRequestViewModel }> {
    const { office } = params
    const randomStatus = TaskStatus[
      faker.helpers.replaceSymbolWithNumber(
        faker.random.arrayElement(Object.getOwnPropertyNames(TaskStatus))
      )
    ]

    const request: CreateTaskRequestViewModel = {
      title: faker.name.findName(),
      description: faker.lorem.text(20),
      status: randomStatus,
      startDate: new Date().toISOString().split('T')[0],
      finishDate: new Date().toISOString().split('T')[0],
      startTime: `${faker.datatype.number({ min: 12, max: 23 })}:${faker.datatype.number({ min: 10, max: 60 })}`,
      finishTime: `${faker.datatype.number({ min: 12, max: 23 })}:${faker.datatype.number({ min: 10, max: 60 })}`
    }

    const metadata: any = {}
    if (faker.datatype.boolean()) {
      const responsible = await createUser(office)
      request.responsible = { id: responsible.id }
      metadata.responsible = responsible
    }

    return {
      metadata,
      viewModel: request
    }
  }

  function getExpectedObject(params: {
    metadata: any,
    responseViewModel: CreateTaskResponseViewModel,
    office: CreateOfficeResponseViewModel
  }): CreateTaskResponseViewModel {
    const { metadata, responseViewModel, office } = params

    return {
      ...responseViewModel,
      title: responseViewModel.title.toUpperCase(),
      description: responseViewModel.description?.toUpperCase(),
      status: responseViewModel.status,
      responsible: {
        id: metadata.responsible?.id || office.user.id,
        name: metadata.responsible?.name || office.user.name,
        username: metadata.responsible?.username || office.user.username
      }
    }
  }

  integrationTestRunner.run()
})
