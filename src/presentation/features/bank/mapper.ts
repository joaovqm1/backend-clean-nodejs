import {
  CreateBankRequestDTO,
  Filter,
  ReadBankResponseDTO,
  UpdateBankRequestDTO,
  UpdateBankResponseDTO,
  UpdateCrudRequestDTO,
} from '@/domain'
import { BaseCrudViewModelMapper } from '@/presentation/base-crud-view-model-mapper'
import { transformRequestToFilters } from '@/presentation/request-to-filters'

export interface CreateBankRequestViewModel
  extends CreateBankRequestDTO { }
export interface CreateBankResponseViewModel
  extends ReadBankResponseDTO { }

export interface ReadBankRequestViewModel {
  id?: number
}
export interface ReadBankResponseViewModel
  extends ReadBankResponseDTO { }

export interface UpdateBankRequestViewModel
  extends UpdateBankRequestDTO { }
export interface UpdateBankResponseViewModel
  extends UpdateBankRequestDTO { }

export class BankViewModelMapper implements BaseCrudViewModelMapper {
  fromCreateRequestViewModelToCreateRequestDTO(
    request: CreateBankRequestViewModel
  ): CreateBankRequestDTO {
    return this.fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(
      request
    ) as CreateBankRequestDTO
  }

  fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(
    request: | CreateBankRequestViewModel | UpdateBankRequestViewModel
  ): CreateBankRequestDTO | UpdateCrudRequestDTO {
    return {
      ...request,
      name: request.name.toUpperCase(),
      number: request.number.toUpperCase()
    }
  }

  fromCreateResponseDTOToCreateResponseViewModel(
    response: ReadBankResponseDTO
  ): CreateBankResponseViewModel {
    return response
  }

  fromUpdateRequestViewModelToUpdateRequestDTO(
    request: UpdateBankRequestViewModel
  ): UpdateBankResponseDTO {
    return this.fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(
      request
    ) as UpdateBankResponseDTO
  }

  fromUpdateResponseDTOToUpdateResponseViewModel(
    request: ReadBankResponseDTO
  ): UpdateBankResponseDTO {
    return request
  }

  fromReadRequestViewModelToFilters(request: ReadBankRequestViewModel): Filter[] {
    return transformRequestToFilters({ fieldsAndFilters: { id: 'equalTo' }, request })
  }

  fromReadOneResponseDTOToReadResponseOneViewModel(
    response: ReadBankResponseDTO
  ): ReadBankResponseViewModel {
    return response
  }

  fromReadManyResponseDTOToReadResponseOneViewModel(
    response: ReadBankResponseDTO[]
  ): ReadBankResponseViewModel[] {
    return response.map(this.fromReadOneResponseDTOToReadResponseOneViewModel)
  }
}
