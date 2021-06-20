import {
  CreatePhasesRequestDTO,
  Filter,
  ReadPhaseResponseDTO,
  UpdateCrudRequestDTO,
  UpdatePhasesRequestDTO,
  UpdatePhasesResponseDTO,
} from '@/domain'
import { BaseCrudViewModelMapper } from '@/presentation/base-crud-view-model-mapper'
import { transformRequestToFilters } from '@/presentation/request-to-filters'

export interface CreatePhasesRequestViewModel
  extends CreatePhasesRequestDTO { }
export interface CreatePhasesResponseViewModel
  extends ReadPhaseResponseDTO { }

export interface ReadPhasesRequestViewModel {
  id: number
}

export interface ReadPhasesResponseViewModel
  extends ReadPhaseResponseDTO { }

export interface UpdatePhasesRequestViewModel
  extends UpdatePhasesRequestDTO { }
export interface UpdatePhasesResponseViewModel
  extends UpdatePhasesRequestDTO { }

export class PhasesViewModelMapper implements BaseCrudViewModelMapper {
  fromCreateRequestViewModelToCreateRequestDTO(
    request: CreatePhasesRequestViewModel
  ): CreatePhasesRequestDTO {
    return this.fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(
      request
    ) as CreatePhasesRequestDTO
  }

  fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(
    request: CreatePhasesRequestViewModel | UpdatePhasesRequestViewModel
  ): CreatePhasesRequestDTO | UpdateCrudRequestDTO {
    return {
      ...request,
      description: request.description.toUpperCase(),
    }
  }

  fromCreateResponseDTOToCreateResponseViewModel(
    response: ReadPhaseResponseDTO
  ): CreatePhasesResponseViewModel {
    return response
  }

  fromUpdateRequestViewModelToUpdateRequestDTO(
    request: UpdatePhasesRequestViewModel
  ): UpdatePhasesResponseDTO {
    return this.fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(
      request
    ) as UpdatePhasesResponseDTO
  }

  fromUpdateResponseDTOToUpdateResponseViewModel(
    request: ReadPhaseResponseDTO
  ): UpdatePhasesResponseDTO {
    return request
  }

  fromReadRequestViewModelToFilters(request: ReadPhasesRequestViewModel): Filter[] {
    return transformRequestToFilters({
      request,
      fieldsAndFilters: {
        id: 'equalTo',
        officeId: 'exists'
      }
    })
  }

  fromReadOneResponseDTOToReadResponseOneViewModel(
    response: ReadPhaseResponseDTO
  ): ReadPhasesResponseViewModel {
    return response
  }

  fromReadManyResponseDTOToReadResponseOneViewModel(
    response: ReadPhaseResponseDTO[]
  ): ReadPhasesResponseViewModel[] {
    return response.map(this.fromReadOneResponseDTOToReadResponseOneViewModel)
  }
}
