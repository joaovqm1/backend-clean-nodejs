import {
  CreateFinanceMethodRequestDTO,
  Filter,
  ReadFinanceMethodResponseDTO,
  UpdateCrudRequestDTO,
  UpdateFinanceMethodRequestDTO,
  UpdateFinanceMethodResponseDTO,
} from '@/domain'
import { BaseCrudViewModelMapper } from '@/presentation/base-crud-view-model-mapper'
import { transformRequestToFilters } from '@/presentation/request-to-filters'

export interface CreateFinanceMethodRequestViewModel
  extends CreateFinanceMethodRequestDTO { }
export interface CreateFinanceMethodResponseViewModel
  extends ReadFinanceMethodResponseDTO { }

export interface ReadFinanceMethodRequestViewModel {
  id: number
}

export interface ReadFinanceMethodResponseViewModel
  extends ReadFinanceMethodResponseDTO { }

export interface UpdateFinanceMethodRequestViewModel
  extends UpdateFinanceMethodRequestDTO { }
export interface UpdateFinanceMethodResponseViewModel
  extends UpdateFinanceMethodRequestDTO { }

export class FinanceMethodViewModelMapper implements BaseCrudViewModelMapper {
  fromCreateRequestViewModelToCreateRequestDTO(
    request: CreateFinanceMethodRequestViewModel
  ): CreateFinanceMethodRequestDTO {
    return this.fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(
      request
    ) as CreateFinanceMethodRequestDTO
  }

  fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(
    request: CreateFinanceMethodRequestViewModel | UpdateFinanceMethodRequestViewModel
  ): CreateFinanceMethodRequestDTO | UpdateCrudRequestDTO {
    return {
      ...request,
      description: request.description.toUpperCase(),
    }
  }

  fromCreateResponseDTOToCreateResponseViewModel(
    response: ReadFinanceMethodResponseDTO
  ): CreateFinanceMethodResponseViewModel {
    return response
  }

  fromUpdateRequestViewModelToUpdateRequestDTO(
    request: UpdateFinanceMethodRequestViewModel
  ): UpdateFinanceMethodResponseDTO {
    return this.fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(
      request
    ) as UpdateFinanceMethodResponseDTO
  }

  fromUpdateResponseDTOToUpdateResponseViewModel(
    request: ReadFinanceMethodResponseDTO
  ): UpdateFinanceMethodResponseDTO {
    return request
  }

  fromReadRequestViewModelToFilters(request: ReadFinanceMethodRequestViewModel): Filter[] {
    return transformRequestToFilters({
      request,
      fieldsAndFilters: {
        id: 'equalTo',
        officeId: 'exists'
      }
    })
  }

  fromReadOneResponseDTOToReadResponseOneViewModel(
    response: ReadFinanceMethodResponseDTO
  ): ReadFinanceMethodResponseViewModel {
    return response
  }

  fromReadManyResponseDTOToReadResponseOneViewModel(
    response: ReadFinanceMethodResponseDTO[]
  ): ReadFinanceMethodResponseViewModel[] {
    return response.map(this.fromReadOneResponseDTOToReadResponseOneViewModel)
  }
}
