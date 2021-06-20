import {
  CreateProjectPhaseRequestDTO,
  Filter, projectPhasesFieldsToInclude, ReadProjectPhaseResponseDTO, UpdateProjectPhaseRequestDTO,
} from '@/domain'
import { BaseCrudViewModelMapper } from '@/presentation/base-crud-view-model-mapper'
import { transformRequestToFilters } from '@/presentation/request-to-filters'


export interface CreateProjectPhaseRequestViewModel extends CreateProjectPhaseRequestDTO { }
export interface CreateProjectPhaseResponseViewModel extends ReadProjectPhaseResponseDTO { }

export interface ReadProjectPhaseRequestViewModel {
  id: number
}

export interface ReadProjectPhaseResponseViewModel extends ReadProjectPhaseResponseDTO { }

export interface UpdateProjectPhaseRequestViewModel extends UpdateProjectPhaseRequestDTO { }
export interface UpdateProjectPhaseResponseViewModel extends ReadProjectPhaseResponseDTO { }

export class ProjectPhaseViewModelMapper implements BaseCrudViewModelMapper {
  fromCreateRequestViewModelToCreateRequestDTO(
    request: CreateProjectPhaseRequestViewModel
  ): CreateProjectPhaseRequestDTO {
    return this.fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(
      request
    ) as CreateProjectPhaseRequestDTO
  }

  fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(
    request: CreateProjectPhaseRequestViewModel | UpdateProjectPhaseRequestViewModel
  ): CreateProjectPhaseRequestDTO | UpdateProjectPhaseRequestDTO {
    return {
      ...request
    }
  }

  fromCreateResponseDTOToCreateResponseViewModel(
    response: ReadProjectPhaseResponseDTO
  ): CreateProjectPhaseResponseViewModel {
    return response
  }

  fromUpdateRequestViewModelToUpdateRequestDTO(
    request: UpdateProjectPhaseRequestViewModel
  ): UpdateProjectPhaseRequestDTO {
    return this.fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(
      request
    ) as UpdateProjectPhaseRequestDTO
  }

  fromUpdateResponseDTOToUpdateResponseViewModel(
    request: ReadProjectPhaseResponseDTO
  ): UpdateProjectPhaseResponseViewModel {
    return request
  }

  fromReadRequestViewModelToFilters(request: ReadProjectPhaseRequestViewModel): Filter[] {
    return transformRequestToFilters({
      request,
      fieldsAndFilters: {},
      fieldsToInclude: projectPhasesFieldsToInclude
    })
  }

  fromReadOneResponseDTOToReadResponseOneViewModel(
    response: ReadProjectPhaseResponseDTO
  ): ReadProjectPhaseResponseViewModel {
    return response
  }

  fromReadManyResponseDTOToReadResponseOneViewModel(
    response: ReadProjectPhaseResponseDTO[]
  ): ReadProjectPhaseResponseViewModel[] {
    return response.map(this.fromReadOneResponseDTOToReadResponseOneViewModel)
  }
}
