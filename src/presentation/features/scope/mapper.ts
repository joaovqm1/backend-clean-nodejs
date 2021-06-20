import {
  CreateScopeRequestDTO,
  Filter,
  ReadScopeResponseDTO,
  UpdateCrudRequestDTO,
  UpdateScopeRequestDTO,
  UpdateScopeResponseDTO,
} from '@/domain'
import { BaseCrudViewModelMapper } from '@/presentation/base-crud-view-model-mapper'
import { transformRequestToFilters } from '@/presentation/request-to-filters'

export interface CreateScopeRequestViewModel
  extends CreateScopeRequestDTO { }
export interface CreateScopeResponseViewModel
  extends ReadScopeResponseDTO { }

export interface ReadScopeRequestViewModel {
  id: number
}

export interface ReadScopeResponseViewModel
  extends ReadScopeResponseDTO { }

export interface UpdateScopeRequestViewModel
  extends UpdateScopeRequestDTO { }
export interface UpdateScopeResponseViewModel
  extends UpdateScopeRequestDTO { }

export class ScopeViewModelMapper implements BaseCrudViewModelMapper {
  fromCreateRequestViewModelToCreateRequestDTO(
    request: CreateScopeRequestViewModel
  ): CreateScopeRequestDTO {
    return this.fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(
      request
    ) as CreateScopeRequestDTO
  }

  fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(
    request: CreateScopeRequestViewModel | UpdateScopeRequestViewModel
  ): CreateScopeRequestDTO | UpdateCrudRequestDTO {
    return {
      ...request,
      description: request.description.toUpperCase(),
    }
  }

  fromCreateResponseDTOToCreateResponseViewModel(
    response: ReadScopeResponseDTO
  ): CreateScopeResponseViewModel {
    return response
  }

  fromUpdateRequestViewModelToUpdateRequestDTO(
    request: UpdateScopeRequestViewModel
  ): UpdateScopeResponseDTO {
    return this.fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(
      request
    ) as UpdateScopeResponseDTO
  }

  fromUpdateResponseDTOToUpdateResponseViewModel(
    request: ReadScopeResponseDTO
  ): UpdateScopeResponseDTO {
    return request
  }

  fromReadRequestViewModelToFilters(request: ReadScopeRequestViewModel): Filter[] {
    return transformRequestToFilters({
      request,
      fieldsAndFilters: {
        id: 'equalTo',
        officeId: 'exists'
      }
    })
  }

  fromReadOneResponseDTOToReadResponseOneViewModel(
    response: ReadScopeResponseDTO
  ): ReadScopeResponseViewModel {
    return response
  }

  fromReadManyResponseDTOToReadResponseOneViewModel(
    response: ReadScopeResponseDTO[]
  ): ReadScopeResponseViewModel[] {
    return response.map(this.fromReadOneResponseDTOToReadResponseOneViewModel)
  }
}
