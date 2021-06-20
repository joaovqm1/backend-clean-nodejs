import {
  CreateDocumentRequestDTO,
  Filter,
  ReadDocumentResponseDTO,
  UpdateCrudRequestDTO,
  UpdateDocumentRequestDTO,
  UpdateDocumentResponseDTO,
  UploadDocumentRequestDTO,
} from '@/domain'
import { BaseCrudViewModelMapper } from '@/presentation/base-crud-view-model-mapper'
import { transformRequestToFilters } from '@/presentation/request-to-filters'

export interface CreateDocumentRequestViewModel extends UploadDocumentRequestDTO { }
export interface CreateDocumentResponseViewModel extends ReadDocumentResponseDTO { }

export interface ReadDocumentRequestViewModel {
  id?: number
}
export interface ReadDocumentResponseViewModel extends ReadDocumentResponseDTO { }

export interface UpdateDocumentRequestViewModel extends UploadDocumentRequestDTO { }
export interface UpdateDocumentResponseViewModel extends UpdateDocumentRequestDTO { }

export class DocumentViewModelMapper implements BaseCrudViewModelMapper {
  fromCreateRequestViewModelToCreateRequestDTO(
    request: CreateDocumentRequestViewModel
  ): CreateDocumentRequestDTO {
    return this.fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(
      request
    ) as CreateDocumentRequestDTO
  }

  fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(
    request: CreateDocumentRequestViewModel | UpdateDocumentRequestViewModel
  ): CreateDocumentRequestDTO | UpdateCrudRequestDTO {
    return {
      ...request
    }
  }

  fromCreateResponseDTOToCreateResponseViewModel(
    response: ReadDocumentResponseDTO
  ): CreateDocumentResponseViewModel {
    return response
  }

  fromUpdateRequestViewModelToUpdateRequestDTO(request: UpdateDocumentRequestViewModel): UpdateDocumentResponseDTO {
    return this.fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(request) as UpdateDocumentResponseDTO
  }

  fromUpdateResponseDTOToUpdateResponseViewModel(
    response: ReadDocumentResponseDTO
  ): UpdateDocumentResponseDTO {
    return response
  }

  fromReadRequestViewModelToFilters(request: ReadDocumentRequestViewModel): Filter[] {
    return transformRequestToFilters({
      request
    })
  }

  fromReadOneResponseDTOToReadResponseOneViewModel(
    response: ReadDocumentResponseDTO
  ): ReadDocumentResponseViewModel {
    return response
  }

  fromReadManyResponseDTOToReadResponseOneViewModel(
    response: ReadDocumentResponseDTO[]
  ): ReadDocumentResponseViewModel[] {
    return response.map(this.fromReadOneResponseDTOToReadResponseOneViewModel)
  }
}
