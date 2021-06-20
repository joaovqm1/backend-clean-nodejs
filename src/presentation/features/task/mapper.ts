import {
  CreateTaskRequestDTO,
  Filter,
  ReadTaskResponseDTO,
  tasksFieldsToInclude,
  UpdateCrudRequestDTO,
  UpdateTaskRequestDTO,
  UpdateTaskResponseDTO,
} from '@/domain'
import { BaseCrudViewModelMapper } from '@/presentation/base-crud-view-model-mapper'
import { transformRequestToFilters } from '@/presentation/request-to-filters'

export interface CreateTaskRequestViewModel extends CreateTaskRequestDTO { }
export interface CreateTaskResponseViewModel extends ReadTaskResponseDTO { }
export interface ReadTaskRequestViewModel {
  id?: number
  projectId?: number
}

export interface ReadTaskResponseViewModel extends ReadTaskResponseDTO { }
export interface UpdateTaskRequestViewModel extends UpdateTaskRequestDTO { }
export interface UpdateTaskResponseViewModel extends UpdateTaskRequestDTO { }
export class TaskViewModelMapper implements BaseCrudViewModelMapper {
  fromCreateRequestViewModelToCreateRequestDTO(request: CreateTaskRequestViewModel): CreateTaskRequestDTO {
    return this.fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(request) as CreateTaskRequestDTO
  }

  fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(
    request: | CreateTaskRequestViewModel | UpdateTaskRequestViewModel): CreateTaskRequestDTO | UpdateCrudRequestDTO {
    return {
      ...request,
      description: request.description?.toUpperCase(),
      status: request.status.toUpperCase(),
      title: request.title.toUpperCase(),

    }
  }

  fromCreateResponseDTOToCreateResponseViewModel(response: ReadTaskResponseDTO): CreateTaskResponseViewModel {
    return response
  }

  fromUpdateRequestViewModelToUpdateRequestDTO(request: UpdateTaskRequestViewModel): UpdateTaskResponseDTO {
    return this.fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(request) as UpdateTaskResponseDTO
  }

  fromUpdateResponseDTOToUpdateResponseViewModel(request: ReadTaskResponseDTO): UpdateTaskResponseDTO {
    return request
  }

  fromReadRequestViewModelToFilters(request: ReadTaskRequestViewModel): Filter[] {
    return transformRequestToFilters({
      request,
      fieldsAndFilters: {
        projectId: 'equalTo'
      },
      fieldsToInclude: tasksFieldsToInclude
    })
  }

  fromReadOneResponseDTOToReadResponseOneViewModel(response: ReadTaskResponseDTO): ReadTaskResponseViewModel {
    return response
  }

  fromReadManyResponseDTOToReadResponseOneViewModel(response: ReadTaskResponseDTO[]): ReadTaskResponseViewModel[] {
    return response.map(this.fromReadOneResponseDTOToReadResponseOneViewModel)
  }
}
