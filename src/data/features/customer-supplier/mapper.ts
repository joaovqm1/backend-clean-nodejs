import { StringUtilities, TypeUtilities } from '@/data/contracts'
import { BaseModelMapper } from '@/data/mapper'
import {
  CreateCustomerSupplierRequestDTO,
  CustomerSupplierClass,
  ReadCustomerSupplierResponseDTO,
  UpdateCustomerSupplierRequestDTO,
} from '@/domain'

import { CustomerSupplierModel } from './model'

export class CustomerSupplierModelMapper implements BaseModelMapper {
  private readonly stringUtilities: StringUtilities
  private readonly typeUtilities: TypeUtilities

  constructor(params: {
    stringUtilities: StringUtilities
    typeUtilities: TypeUtilities
  }) {
    this.stringUtilities = params.stringUtilities
    this.typeUtilities = params.typeUtilities
  }

  fromCreateRequestDTOToModel(request: CreateCustomerSupplierRequestDTO): Omit<CustomerSupplierModel, 'id'> {
    return this.fromCreateUpdateRequestDTOToModel(request)
  }

  fromCreateUpdateRequestDTOToModel(request: CreateCustomerSupplierRequestDTO | CreateCustomerSupplierRequestDTO): Omit<CustomerSupplierModel, 'id'> {
    const cityId = request.city?.id
    const stateId = request.state?.id
    const bankId = request.bank?.id
    delete request.state
    delete request.city
    delete request.bank

    return {
      ...request,
      cityId,
      stateId,
      bankId,
      name: request.name.toUpperCase(),
      tradingName: request.tradingName?.toUpperCase(),
      class: this.typeUtilities.getTheDefinedValue<CustomerSupplierClass>(request.class, CustomerSupplierClass.CUSTOMER),
      cellphone1: this.stringUtilities.removeSpecialCharactersFromString(
        request.cellphone1
      ),
      cellphone2: this.stringUtilities.removeSpecialCharactersFromString(
        request.cellphone2
      ),
      phone1: this.stringUtilities.removeSpecialCharactersFromString(
        request.phone1
      ),
      phone2: this.stringUtilities.removeSpecialCharactersFromString(
        request.phone2
      ),
      cpfCnpj: this.stringUtilities.removeSpecialCharactersFromString(
        request.cpfCnpj
      ),
      identityCard: this.stringUtilities.removeSpecialCharactersFromString(
        request.identityCard
      ),
      address1: request.address1?.toUpperCase(),
      address2: request.address2?.toUpperCase(),
      postcode: this.stringUtilities.removeSpecialCharactersFromString(
        request.postcode
      ),
      addressReference: request.addressReference?.toUpperCase(),
      neighborhood: request.neighborhood?.toUpperCase(),
      addressNumber: request.addressNumber?.toUpperCase(),
      addressComplement: request.addressComplement?.toUpperCase(),
      additionalInfo: request.additionalInfo?.toUpperCase(),
      bankBranch: request.bankBranch?.toUpperCase(),
      bankAccount: request.bankAccount?.toUpperCase()
    }
  }

  fromUpdateRequestDTOToModel(request: UpdateCustomerSupplierRequestDTO): CustomerSupplierModel {
    return this.fromCreateUpdateRequestDTOToModel(request) as CustomerSupplierModel
  }

  fromModelToReadOneResponse(model: CustomerSupplierModel): ReadCustomerSupplierResponseDTO {
    return {
      ...model,
    }
  }

  fromModelToReadManyResponse(
    models: CustomerSupplierModel[]
  ): ReadCustomerSupplierResponseDTO[] {
    return models.map(this.fromModelToReadOneResponse)
  }
}
