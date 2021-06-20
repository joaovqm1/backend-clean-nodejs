import faker from 'faker'
import { IntegrationTestRunner } from '@/test/utilities/integration-test-runner'
import { ProjectStatus } from '@/infra/database/models'
import { CreateProjectStatusRequestViewModel, CreateProjectStatusResponseViewModel } from '@/presentation'

describe('CRUD ProjectStatus', function() {
  const integrationTestRunner = new IntegrationTestRunner({
    feature: 'projectsstatus',
    getObjectToCreate: getRandomCreateViewModel,
    getExpectedObject: getExpectedObject,
    uniqueErrorMessage: 'Já existe um status de projeto cadastrado com essa descrição',
    uniqueAttributes: {
      uniqueDescription: ['description'],
    },
    sequelizeModel: ProjectStatus,
    shouldCheckUpdaterId: false
  })

  function getRandomCreateViewModel(): { viewModel: CreateProjectStatusRequestViewModel } {
    return {
      viewModel: { description: faker.lorem.text(20) }
    }
  }

  function getExpectedObject(params: { responseViewModel: CreateProjectStatusResponseViewModel }): CreateProjectStatusResponseViewModel {
    const { responseViewModel } = params
    return {
      ...responseViewModel,
      description: responseViewModel.description.toUpperCase(),

    }
  }

  integrationTestRunner.run()
})
