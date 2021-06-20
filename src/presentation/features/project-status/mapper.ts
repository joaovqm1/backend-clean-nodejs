import {
  CreateProjectStatusRequestDTO,
  Filter,
  ReadProjectStatusResponseDTO,
  UpdateCrudRequestDTO,
  UpdateProjectStatusRequestDTO,
  UpdateProjectStatusResponseDTO,
} from '@/domain'
import { BaseCrudViewModelMapper } from '@/presentation/base-crud-view-model-mapper'
import { transformRequestToFilters } from '@/presentation/request-to-filters'

export interface CreateProjectStatusRequestViewModel extends CreateProjectStatusRequestDTO { }
export interface CreateProjectStatusResponseViewModel extends ReadProjectStatusResponseDTO { }
export interface ReadProjectStatusRequestViewModel {
  id: number
}

export interface ReadProjectStatusResponseViewModel extends ReadProjectStatusResponseDTO { }

export interface UpdateProjectStatusRequestViewModel extends UpdateProjectStatusRequestDTO { }
export interface UpdateProjectStatusResponseViewModel extends UpdateProjectStatusRequestDTO { }

export class ProjectStatusViewModelMapper implements BaseCrudViewModelMapper {
  fromCreateRequestViewModelToCreateRequestDTO(
    request: CreateProjectStatusRequestViewModel
  ): CreateProjectStatusRequestDTO {
    return this.fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(
      request
    ) as CreateProjectStatusRequestDTO
  }

  fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(
    request: CreateProjectStatusRequestViewModel | UpdateProjectStatusRequestViewModel
  ): CreateProjectStatusRequestDTO | UpdateCrudRequestDTO {
    return {
      ...request,
      description: request.description.toUpperCase(),
    }
  }

  fromCreateResponseDTOToCreateResponseViewModel(
    response: ReadProjectStatusResponseDTO
  ): CreateProjectStatusResponseViewModel {
    return response
  }

  fromUpdateRequestViewModelToUpdateRequestDTO(
    request: UpdateProjectStatusRequestViewModel
  ): UpdateProjectStatusResponseDTO {
    return this.fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(
      request
    ) as UpdateProjectStatusResponseDTO
  }

  fromUpdateResponseDTOToUpdateResponseViewModel(
    request: ReadProjectStatusResponseDTO
  ): UpdateProjectStatusResponseDTO {
    return request
  }

  fromReadRequestViewModelToFilters(request: ReadProjectStatusRequestViewModel): Filter[] {
    return transformRequestToFilters({
      request,
      fieldsAndFilters: {
        id: 'equalTo',
        officeId: 'exists'
      }
    })
  }

  fromReadOneResponseDTOToReadResponseOneViewModel(
    response: ReadProjectStatusResponseDTO
  ): ReadProjectStatusResponseViewModel {
    return response
  }

  fromReadManyResponseDTOToReadResponseOneViewModel(
    response: ReadProjectStatusResponseDTO[]
  ): ReadProjectStatusResponseViewModel[] {
    return response.map(this.fromReadOneResponseDTOToReadResponseOneViewModel)
  }
}
