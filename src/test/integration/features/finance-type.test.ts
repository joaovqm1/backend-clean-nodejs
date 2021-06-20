import faker from 'faker'
import { IntegrationTestRunner } from '@/test/utilities/integration-test-runner'
import { FinanceType } from '@/infra/database/models'
import { CreateFinanceTypeRequestViewModel, CreateFinanceTypeResponseViewModel } from '@/presentation'
import { FinanceTypeEnum } from '@/domain'
describe('CRUD FinanceType', function() {
  const integrationTestRunner = new IntegrationTestRunner({
    feature: 'financetypes',
    getObjectToCreate: getRandomCreateViewModel,
    getExpectedObject: getExpectedObject,
    uniqueErrorMessage: 'Já existe um tipo financeiro cadastrado com essa descrição',
    uniqueAttributes: { uniqueDescription: ['description'] },
    sequelizeModel: FinanceType,
    shouldCheckUpdaterId: false
  })

  function getRandomCreateViewModel(): { viewModel: CreateFinanceTypeRequestViewModel } {
    const randomFinanceType = FinanceTypeEnum[
      faker.helpers.replaceSymbolWithNumber(
        faker.random.arrayElement(Object.getOwnPropertyNames(FinanceTypeEnum))
      )
    ]

    return {
      viewModel: {
        description: faker.lorem.text(20),
        type: randomFinanceType
      }
    }
  }

  function getExpectedObject(params: { responseViewModel: CreateFinanceTypeResponseViewModel }): CreateFinanceTypeResponseViewModel {
    const { responseViewModel } = params

    return {
      ...responseViewModel,
      description: responseViewModel.description,
      type: responseViewModel.type
    }
  }

  integrationTestRunner.run()
})
