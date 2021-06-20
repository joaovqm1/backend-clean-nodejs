import {
  CreateFinanceTypeRequestDTO,
  Filter,
  ReadFinanceTypeResponseDTO,
  UpdateCrudRequestDTO,
  UpdateFinanceTypeRequestDTO,
  UpdateFinanceTypeResponseDTO,
} from '@/domain'
import { BaseCrudViewModelMapper } from '@/presentation/base-crud-view-model-mapper'
import { transformRequestToFilters } from '@/presentation/request-to-filters'

export interface CreateFinanceTypeRequestViewModel
  extends CreateFinanceTypeRequestDTO { }
export interface CreateFinanceTypeResponseViewModel
  extends ReadFinanceTypeResponseDTO { }

export interface ReadFinanceTypeRequestViewModel {
  id?: number
  type?: string
}

export interface ReadFinanceTypeResponseViewModel
  extends ReadFinanceTypeResponseDTO { }

export interface UpdateFinanceTypeRequestViewModel
  extends UpdateFinanceTypeRequestDTO { }
export interface UpdateFinanceTypeResponseViewModel
  extends UpdateFinanceTypeRequestDTO { }

export class FinanceTypeViewModelMapper implements BaseCrudViewModelMapper {
  fromCreateRequestViewModelToCreateRequestDTO(
    request: CreateFinanceTypeRequestViewModel
  ): CreateFinanceTypeRequestDTO {
    return this.fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(
      request
    ) as CreateFinanceTypeRequestDTO
  }

  fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(
    request: CreateFinanceTypeRequestViewModel | UpdateFinanceTypeRequestViewModel
  ): CreateFinanceTypeRequestDTO | UpdateCrudRequestDTO {
    return {
      ...request,
      description: request.description.toUpperCase(),
      type: request.type.toUpperCase(),

    }
  }

  fromCreateResponseDTOToCreateResponseViewModel(
    response: ReadFinanceTypeResponseDTO
  ): CreateFinanceTypeResponseViewModel {
    return response
  }

  fromUpdateRequestViewModelToUpdateRequestDTO(
    request: UpdateFinanceTypeRequestViewModel
  ): UpdateFinanceTypeResponseDTO {
    return this.fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(
      request
    ) as UpdateFinanceTypeResponseDTO
  }

  fromUpdateResponseDTOToUpdateResponseViewModel(
    request: ReadFinanceTypeResponseDTO
  ): UpdateFinanceTypeResponseDTO {
    return request
  }

  fromReadRequestViewModelToFilters(request: ReadFinanceTypeRequestViewModel): Filter[] {
    return transformRequestToFilters({
      request,
      fieldsAndFilters: {
        id: 'equalTo',
        officeId: 'exists',
        type: 'containedIn',
      }
    })
  }

  fromReadOneResponseDTOToReadResponseOneViewModel(
    response: ReadFinanceTypeResponseDTO
  ): ReadFinanceTypeResponseViewModel {
    return response
  }

  fromReadManyResponseDTOToReadResponseOneViewModel(
    response: ReadFinanceTypeResponseDTO[]
  ): ReadFinanceTypeResponseViewModel[] {
    return response.map(this.fromReadOneResponseDTOToReadResponseOneViewModel)
  }
}
