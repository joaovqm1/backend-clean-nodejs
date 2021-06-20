import faker from 'faker'

import { IntegrationTestRunner } from '@/test/utilities/integration-test-runner'
import { CustomerSupplier } from '@/infra/database/models'
import { CreateCustomerSupplierResponseViewModel } from '@/presentation'
import { CustomerSupplierClass } from '@/domain'
import { removeSpecialCharactersFromString } from '@/test/utilities/fakes'
import { getCityById, getStateById } from '@/test/utilities/mocks'
import { getRandomCreateCustomerSupplierViewModel } from '@/test/utilities/set-up'

for (const className of [CustomerSupplierClass.CUSTOMER, CustomerSupplierClass.SUPPLIER, CustomerSupplierClass.BOTH]) {
  describe(`CRUD ${className}`, function() {
    let feature: string

    switch (className) {
      case CustomerSupplierClass.CUSTOMER:
        feature = 'customers'
        break
      case CustomerSupplierClass.SUPPLIER:
        feature = 'suppliers'
        break
      default:
        feature = 'customerssuppliers'
        break
    }

    const integrationTestRunner = new IntegrationTestRunner({
      feature,
      getObjectToCreate: getRandomCreateCustomerSupplierViewModel,
      getExpectedObject: getExpectedObject,
      uniqueAttributes: { uniqueNameCnpj: ['name', 'cpfCnpj'] },
      uniqueErrorMessage: 'Já existe um cliente ou fornecedor cadastrado com esse nome ou cpf/cnpj',
      sequelizeModel: CustomerSupplier
    })

    function getExpectedObject(params: { responseViewModel: CreateCustomerSupplierResponseViewModel }): CreateCustomerSupplierResponseViewModel {
      const { responseViewModel: createResponseViewModel } = params

      return {
        ...createResponseViewModel,
        class: className,
        name: createResponseViewModel.name.toUpperCase(),
        tradingName: createResponseViewModel.tradingName?.toUpperCase(),
        identityCard: removeSpecialCharactersFromString(createResponseViewModel.identityCard),
        phone1: removeSpecialCharactersFromString(createResponseViewModel.phone1),
        phone2: removeSpecialCharactersFromString(createResponseViewModel.phone2),
        cellphone1: removeSpecialCharactersFromString(createResponseViewModel.cellphone1),
        cellphone2: removeSpecialCharactersFromString(createResponseViewModel.cellphone2),
        postcode: removeSpecialCharactersFromString(createResponseViewModel.postcode),
        cpfCnpj: removeSpecialCharactersFromString(createResponseViewModel.cpfCnpj),
        address1: createResponseViewModel.address1?.toUpperCase(),
        addressReference: createResponseViewModel.addressReference?.toUpperCase(),
        neighborhood: createResponseViewModel.neighborhood?.toUpperCase(),
        city: getCityById(createResponseViewModel.city.id),
        state: getStateById(createResponseViewModel.state.id),
      }
    }
    integrationTestRunner.run()
  })
}
