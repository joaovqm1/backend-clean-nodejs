import faker from 'faker'
import { IntegrationTestRunner } from '@/test/utilities/integration-test-runner'
import { Phases } from '@/infra/database/models'
import { CreatePhasesRequestViewModel, CreatePhasesResponseViewModel } from '@/presentation'

describe('CRUD Phases', function() {
  const integrationTestRunner = new IntegrationTestRunner({
    feature: 'phases',
    getObjectToCreate: getRandomCreateViewModel,
    getExpectedObject: getExpectedObject,
    uniqueErrorMessage: 'Já existe um passo cadastrado com essa descrição',
    uniqueAttributes: { uniqueDescription: ['description'] },
    sequelizeModel: Phases,
    shouldCheckUpdaterId: false
  })

  function getRandomCreateViewModel(): { viewModel: CreatePhasesRequestViewModel } {
    return {
      viewModel: { description: faker.internet.userName() }
    }
  }

  function getExpectedObject(params: { responseViewModel: CreatePhasesResponseViewModel }): CreatePhasesResponseViewModel {
    const { responseViewModel } = params
    return {
      ...responseViewModel,
      description: responseViewModel.description.toUpperCase(),

    }
  }

  integrationTestRunner.run()
})
