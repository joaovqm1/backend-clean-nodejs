import {
  Filter,
  ReadStateResponseDTO
} from '@/domain'
import { BaseCrudViewModelMapper } from '@/presentation/base-crud-view-model-mapper'
import { transformRequestToFilters } from '@/presentation/request-to-filters'

export interface ReadStateRequestViewModel {
  id?: number
}
export interface ReadStateResponseViewModel
  extends ReadStateResponseDTO { }

export class StateViewModelMapper implements BaseCrudViewModelMapper {
  fromReadRequestViewModelToFilters(request: ReadStateRequestViewModel): Filter[] {
    return transformRequestToFilters({
      request,
      fieldsAndFilters: {
        id: 'equalTo'
      }
    })
  }

  fromReadOneResponseDTOToReadResponseOneViewModel(response: ReadStateResponseDTO): ReadStateResponseViewModel {
    return response
  }

  fromReadManyResponseDTOToReadResponseOneViewModel(response: ReadStateResponseDTO[]): ReadStateResponseViewModel[] {
    return response.map(this.fromReadOneResponseDTOToReadResponseOneViewModel)
  }
}
