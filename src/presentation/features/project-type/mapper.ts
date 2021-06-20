import {
  CreateProjectTypeRequestDTO,
  Filter,
  ReadProjectTypeResponseDTO,
  UpdateCrudRequestDTO,
  UpdateProjectTypeRequestDTO,
  UpdateProjectTypeResponseDTO,
} from '@/domain'
import { BaseCrudViewModelMapper } from '@/presentation/base-crud-view-model-mapper'
import { transformRequestToFilters } from '@/presentation/request-to-filters'

export interface CreateProjectTypeRequestViewModel
  extends CreateProjectTypeRequestDTO { }
export interface CreateProjectTypeResponseViewModel
  extends ReadProjectTypeResponseDTO { }

export interface ReadProjectTypeRequestViewModel {
  id: number
}

export interface ReadProjectTypeResponseViewModel
  extends ReadProjectTypeResponseDTO { }

export interface UpdateProjectTypeRequestViewModel
  extends UpdateProjectTypeRequestDTO { }
export interface UpdateProjectTypeResponseViewModel
  extends UpdateProjectTypeRequestDTO { }

export class ProjectTypeViewModelMapper implements BaseCrudViewModelMapper {
  fromCreateRequestViewModelToCreateRequestDTO(
    request: CreateProjectTypeRequestViewModel
  ): CreateProjectTypeRequestDTO {
    return this.fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(
      request
    ) as CreateProjectTypeRequestDTO
  }

  fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(
    request: CreateProjectTypeRequestViewModel | UpdateProjectTypeRequestViewModel
  ): CreateProjectTypeRequestDTO | UpdateCrudRequestDTO {
    return {
      ...request,
      description: request.description.toUpperCase(),
    }
  }

  fromCreateResponseDTOToCreateResponseViewModel(
    response: ReadProjectTypeResponseDTO
  ): CreateProjectTypeResponseViewModel {
    return response
  }

  fromUpdateRequestViewModelToUpdateRequestDTO(
    request: UpdateProjectTypeRequestViewModel
  ): UpdateProjectTypeResponseDTO {
    return this.fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(
      request
    ) as UpdateProjectTypeResponseDTO
  }

  fromUpdateResponseDTOToUpdateResponseViewModel(
    request: ReadProjectTypeResponseDTO
  ): UpdateProjectTypeResponseDTO {
    return request
  }

  fromReadRequestViewModelToFilters(request: ReadProjectTypeRequestViewModel): Filter[] {
    return transformRequestToFilters({
      request,
      fieldsAndFilters: {
        id: 'equalTo',
        officeId: 'exists'
      }
    })
  }

  fromReadOneResponseDTOToReadResponseOneViewModel(
    response: ReadProjectTypeResponseDTO
  ): ReadProjectTypeResponseViewModel {
    return response
  }

  fromReadManyResponseDTOToReadResponseOneViewModel(
    response: ReadProjectTypeResponseDTO[]
  ): ReadProjectTypeResponseViewModel[] {
    return response.map(this.fromReadOneResponseDTOToReadResponseOneViewModel)
  }
}
