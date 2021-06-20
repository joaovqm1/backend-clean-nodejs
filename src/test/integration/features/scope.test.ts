import faker from 'faker'
import { IntegrationTestRunner } from '@/test/utilities/integration-test-runner'
import { Scope } from '@/infra/database/models'
import { CreateScopeRequestViewModel, CreateScopeResponseViewModel } from '@/presentation'

describe('CRUD Scope', function() {
  const integrationTestRunner = new IntegrationTestRunner({
    feature: 'scopes',
    getObjectToCreate: getRandomCreateViewModel,
    getExpectedObject: getExpectedObject,
    uniqueErrorMessage: 'Já existe um escopo cadastrado com essa descrição',
    uniqueAttributes: {
      uniqueDescription: ['description'],
    },
    sequelizeModel: Scope,
    shouldCheckUpdaterId: false
  })

  function getRandomCreateViewModel(): { viewModel: CreateScopeRequestViewModel } {
    return {
      viewModel: { description: faker.internet.userName() }
    }
  }

  function getExpectedObject(params: { responseViewModel: CreateScopeResponseViewModel }): CreateScopeResponseViewModel {
    const { responseViewModel } = params
    return {
      ...responseViewModel,
      description: responseViewModel.description.toUpperCase(),

    }
  }

  integrationTestRunner.run()
})
