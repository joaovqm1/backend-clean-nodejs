import { StringUtilities } from '@/data'
import {
  CreateCustomerSupplierRequestDTO,
  CustomerSupplierClass,
  customerSupplierFieldsToInclude,
  CustomerSupplierProfile,
  Filter,
  ReadCustomerSupplierResponseDTO,
  UpdateCustomerSupplierRequestDTO,
  UpdateCustomerSupplierResponseDTO,
} from '@/domain'
import { BaseCrudViewModelMapper } from '@/presentation/base-crud-view-model-mapper'
import { transformRequestToFilters } from '@/presentation/request-to-filters'

export interface CreateCustomerSupplierRequestViewModel extends Omit<CreateCustomerSupplierRequestDTO, 'class' | 'profile'> {
  profile?: CustomerSupplierProfile
}
export interface CreateCustomerSupplierResponseViewModel extends ReadCustomerSupplierResponseDTO { }
export interface ReadCustomerSupplierRequestViewModel {
  id?: number
  name?: string
  type?: string
}

export interface ReadCustomerSupplierResponseViewModel extends ReadCustomerSupplierResponseDTO { }
export interface UpdateCustomerSupplierRequestViewModel extends Omit<UpdateCustomerSupplierRequestDTO, 'class' | 'profile'> {
  profile?: CustomerSupplierProfile
}
export interface UpdateCustomerSupplierResponseViewModel extends UpdateCustomerSupplierRequestDTO { }

interface Params {
  stringUtilities: StringUtilities
  class: CustomerSupplierClass
}
export class CustomerSupplierViewModelMapper implements BaseCrudViewModelMapper {
  private readonly stringUtilities: StringUtilities
  private readonly class: CustomerSupplierClass

  constructor(params: Params) {
    this.stringUtilities = params.stringUtilities
    this.class = params.class
  }

  fromCreateRequestViewModelToCreateRequestDTO(request: CreateCustomerSupplierRequestViewModel): CreateCustomerSupplierRequestDTO {
    return this.fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(request) as CreateCustomerSupplierRequestDTO
  }

  fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(
    request: | CreateCustomerSupplierRequestViewModel | UpdateCustomerSupplierRequestViewModel
  ): CreateCustomerSupplierRequestDTO | UpdateCustomerSupplierRequestDTO {
    return {
      ...request,
      name: request.name.toUpperCase(),
      class: this.class,
      profile: this.getProfile(request.profile),
      tradingName: request.tradingName?.toUpperCase(),
      cellphone1: this.stringUtilities.removeSpecialCharactersFromString(request.cellphone1),
      cellphone2: this.stringUtilities.removeSpecialCharactersFromString(request.cellphone2),
      phone1: this.stringUtilities.removeSpecialCharactersFromString(request.phone1),
      phone2: this.stringUtilities.removeSpecialCharactersFromString(request.phone2),
      cpfCnpj: this.stringUtilities.removeSpecialCharactersFromString(request.cpfCnpj),
      identityCard: this.stringUtilities.removeSpecialCharactersFromString(request.identityCard),
      address1: request.address1?.toUpperCase(),
      address2: request.address2?.toUpperCase(),
      postcode: this.stringUtilities.removeSpecialCharactersFromString(request.postcode),
      addressReference: request.addressReference?.toUpperCase(),
      neighborhood: request.neighborhood?.toUpperCase(),
      addressNumber: request.addressNumber?.toUpperCase(),
      addressComplement: request.addressComplement?.toUpperCase(),
      additionalInfo: request.additionalInfo?.toUpperCase(),
      bankBranch: request.bankBranch?.toUpperCase(),
      bankAccount: request.bankAccount?.toUpperCase(),
    }
  }

  getProfile(profile?: CustomerSupplierProfile): CustomerSupplierProfile {
    return profile || CustomerSupplierProfile.CUSTUMERSUPPLIER
  }

  fromCreateResponseDTOToCreateResponseViewModel(
    response: ReadCustomerSupplierResponseDTO
  ): CreateCustomerSupplierResponseViewModel {
    return response
  }

  fromUpdateRequestViewModelToUpdateRequestDTO(
    request: UpdateCustomerSupplierRequestViewModel
  ): UpdateCustomerSupplierResponseDTO {
    return this.fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(
      request
    ) as UpdateCustomerSupplierResponseDTO
  }

  fromUpdateResponseDTOToUpdateResponseViewModel(
    request: ReadCustomerSupplierResponseDTO
  ): UpdateCustomerSupplierResponseDTO {
    return request
  }

  fromReadRequestViewModelToFilters(request: ReadCustomerSupplierRequestViewModel): Filter[] {
    return transformRequestToFilters({
      request,
      fieldsAndFilters: {
        id: 'equalTo',
        name: 'equalTo',
        type: 'equalTo',
      },
      fieldsToInclude: customerSupplierFieldsToInclude
    })
  }

  fromReadOneResponseDTOToReadResponseOneViewModel(
    response: ReadCustomerSupplierResponseDTO
  ): ReadCustomerSupplierResponseViewModel {
    return response
  }

  fromReadManyResponseDTOToReadResponseOneViewModel(
    response: ReadCustomerSupplierResponseDTO[]
  ): ReadCustomerSupplierResponseViewModel[] {
    return response.map(this.fromReadOneResponseDTOToReadResponseOneViewModel)
  }
}
