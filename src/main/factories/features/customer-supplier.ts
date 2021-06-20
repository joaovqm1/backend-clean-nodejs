import {
  CustomerSupplierModelMapper, FilterBuilder,
} from '@/data'
import {
  CreateCustomerSupplierRequestDTO,
  CustomerSupplierClass,
  customerSupplierFieldsToInclude,
  Filter,
  ReadCustomerSupplierResponseDTO,
  UpdateCustomerSupplierRequestDTO,
} from '@/domain'
import { stringUtilities, typeUtilities } from '@/main/factories/utilities'
import { CustomerSupplierViewModelMapper } from '@/presentation'

import { RequestParamsWithUser } from '../request-params'
import { CrudFactory } from './crud'

export class CustomerSupplierFactory {
  private readonly customerSupplierCrudFactory: CrudFactory<CreateCustomerSupplierRequestDTO, ReadCustomerSupplierResponseDTO, ReadCustomerSupplierResponseDTO, UpdateCustomerSupplierRequestDTO>
  private readonly modelMapper: CustomerSupplierModelMapper

  constructor(readonly requestParams: RequestParamsWithUser) {
    let className: CustomerSupplierClass
    let defaultGetManyFilters: Filter[] = []
    switch (requestParams.feature.toUpperCase()) {
      case 'CUSTOMERS':
        className = CustomerSupplierClass.CUSTOMER
        defaultGetManyFilters = new FilterBuilder()
          .containedIn('class', [CustomerSupplierClass.CUSTOMER, CustomerSupplierClass.BOTH])
          .build()
        break
      case 'SUPPLIERS':
        className = CustomerSupplierClass.SUPPLIER
        defaultGetManyFilters = new FilterBuilder()
          .containedIn('class', [CustomerSupplierClass.SUPPLIER, CustomerSupplierClass.BOTH])
          .build()
        break
      default:
        className = CustomerSupplierClass.BOTH
        break
    }
    this.modelMapper = new CustomerSupplierModelMapper({
      stringUtilities,
      typeUtilities
    })
    this.customerSupplierCrudFactory = new CrudFactory<CreateCustomerSupplierRequestDTO, ReadCustomerSupplierResponseDTO, ReadCustomerSupplierResponseDTO, UpdateCustomerSupplierRequestDTO>({
      requestParams,
      entityName: 'customerssuppliers',
      modelMapper: this.modelMapper,
      viewModelMapper: new CustomerSupplierViewModelMapper({ stringUtilities, class: className }),
      uniqueConstraintError: 'Já existe um cliente ou fornecedor cadastrado com esse nome ou cpf/cnpj',
      fieldsToIncludeOnQuery: customerSupplierFieldsToInclude,
      defaultGetManyFilters
    })
  }

  getControllerFacade(): any {
    return this.customerSupplierCrudFactory.getControllerFacade()
  }
}
