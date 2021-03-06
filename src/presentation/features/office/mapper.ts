import { StringUtilities } from '@/data'
import {
  CreateOfficeRequestDTO,
  CreateOfficeResponseDTO,
  Filter,
  officeFieldsToInclude,
  ReadOfficeResponseDTO,
} from '@/domain'
import { UpdateOfficeRequestDTO } from '@/domain/features/office/update/request-dto'
import { UpdateOfficeResponseDTO } from '@/domain/features/office/update/response-dto'
import { BaseCrudViewModelMapper } from '@/presentation/base-crud-view-model-mapper'
import { transformRequestToFilters } from '@/presentation/request-to-filters'

export interface CreateOfficeRequestViewModel
  extends CreateOfficeRequestDTO { }

export interface CreateOfficeResponseViewModel
  extends CreateOfficeResponseDTO { }

export interface UpdateOfficeRequestViewModel
  extends UpdateOfficeRequestDTO { }

export interface UpdateOfficeResponseViewModel
  extends UpdateOfficeResponseDTO { }

export interface ReadOfficeResponseViewModel extends ReadOfficeResponseDTO { }

export interface ReadOfficeRequestViewModel {
  id: number
  fields?: string[]
}

export class OfficeViewModelMapper implements BaseCrudViewModelMapper {
  constructor(private readonly stringUtilities: StringUtilities) { }
  fromCreateRequestViewModelToCreateRequestDTO(
    request: CreateOfficeRequestViewModel
  ): CreateOfficeRequestDTO {
    return this.fromCreateUpdateViewModelToCreateUpdateRequestDTO(
      request
    ) as CreateOfficeRequestDTO
  }

  fromCreateUpdateViewModelToCreateUpdateRequestDTO(
    request: CreateOfficeRequestViewModel | UpdateOfficeRequestViewModel
  ): CreateOfficeRequestDTO | UpdateOfficeRequestDTO {
    return {
      ...request,
      name: request.name.toUpperCase(),
      owner: request.owner?.toUpperCase(),
      tradingName: request.tradingName?.toUpperCase(),
      cpf: this.stringUtilities.removeSpecialCharactersFromString(request.cpf),
      cnpj: this.stringUtilities.removeSpecialCharactersFromString(request.cnpj),
      cellphone: this.stringUtilities.removeSpecialCharactersFromString(request.cellphone),
      postcode: this.stringUtilities.removeSpecialCharactersFromString(request.postcode),
      address: request.address?.toUpperCase(),
      addressReference: request.addressReference?.toUpperCase(),
      addressComplement: request.addressComplement?.toUpperCase(),
      neighborhood: request.neighborhood?.toUpperCase(),
    }
  }

  fromCreateResponseDTOToCreateResponseViewModel(
    response: CreateOfficeResponseDTO
  ): CreateOfficeResponseViewModel {
    return response
  }

  fromUpdateRequestViewModelToUpdateRequestDTO(
    request: UpdateOfficeRequestViewModel
  ): UpdateOfficeRequestDTO {
    return this.fromCreateUpdateViewModelToCreateUpdateRequestDTO(
      request
    ) as UpdateOfficeRequestDTO
  }

  fromUpdateResponseDTOToUpdateResponseViewModel(
    response: UpdateOfficeResponseDTO
  ): UpdateOfficeResponseViewModel {
    return response
  }

  fromReadRequestViewModelToFilters(request: ReadOfficeRequestViewModel): Filter[] {
    return transformRequestToFilters({
      request,
      fieldsAndFilters: {
        id: 'equalTo'
      },
      fieldsToInclude: officeFieldsToInclude
    })
  }

  fromReadOneResponseDTOToReadResponseOneViewModel(
    response: ReadOfficeResponseDTO
  ): ReadOfficeResponseViewModel {
    return response
  }

  fromReadManyResponseDTOToReadResponseOneViewModel(
    response: ReadOfficeResponseDTO[]
  ): ReadOfficeResponseViewModel[] {
    return response.map(this.fromReadOneResponseDTOToReadResponseOneViewModel)
  }
}
