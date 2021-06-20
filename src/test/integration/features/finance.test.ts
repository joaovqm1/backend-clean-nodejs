import { IntegrationTestRunner } from '@/test/utilities/integration-test-runner'
import { Finance } from '@/infra/database/models'
import { CreateFinanceResponseViewModel, CreateOfficeResponseViewModel } from '@/presentation'
import { getRandomCreateFinanceViewModel } from '@/test/utilities/set-up'
import { FinanceType } from '@/domain'

for (const type of [FinanceType.INCOME, FinanceType.EXPENSE]) {
  describe(`CRUD ${type}`, function() {
    const integrationTestRunner = new IntegrationTestRunner({
      feature: type === FinanceType.INCOME ? 'incomes' : 'expenses',
      getObjectToCreate: async (params: { office: CreateOfficeResponseViewModel }) =>
        await getRandomCreateFinanceViewModel({ type, ...params }),
      getExpectedObject: getExpectedObject,
      sequelizeModel: Finance,
      optionalFields: ['financeMethod'],
      shouldCheckUpdaterId: false
    })


    async function getExpectedObject(
      params: { metadata: any, responseViewModel: CreateFinanceResponseViewModel }
    ): Promise<CreateFinanceResponseViewModel> {
      const { metadata, responseViewModel } = params

      const financeType = metadata.financeType
      const financeMethod = metadata.financeMethod
      return {
        ...responseViewModel,
        description: responseViewModel.description.toUpperCase(),
        financeMethod: {
          id: financeMethod?.id,
          description: financeMethod?.description
        },
        financeType: {
          id: financeType?.id,
          description: financeType?.description
        }
      }
    }

    integrationTestRunner.run()
  })
}
