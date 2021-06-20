import faker from 'faker'
import { IntegrationTestRunner } from '@/test/utilities/integration-test-runner'
import { FinanceMethod } from '@/infra/database/models'
import { CreateFinanceMethodRequestViewModel, CreateFinanceMethodResponseViewModel } from '@/presentation'

describe('CRUD FinanceMethod', function() {
  const integrationTestRunner = new IntegrationTestRunner({
    feature: 'financeMethods',
    getObjectToCreate: getRandomCreateViewModel,
    getExpectedObject: getExpectedObject,
    sequelizeModel: FinanceMethod,
    uniqueAttributes: { uniqueDescription: ['description'] },
    uniqueErrorMessage: 'Já existe um método financeiro cadastrado com essa descrição',
    shouldCheckUpdaterId: false
  })

  function getRandomCreateViewModel(): { viewModel: CreateFinanceMethodRequestViewModel } {
    return {
      viewModel: { description: faker.internet.userName() }
    }
  }

  function getExpectedObject(params: { responseViewModel: CreateFinanceMethodResponseViewModel }): CreateFinanceMethodResponseViewModel {
    const { responseViewModel: createResponseViewModel } = params
    return {
      ...createResponseViewModel,
      description: createResponseViewModel.description.toUpperCase(),

    }
  }

  integrationTestRunner.run()
})
