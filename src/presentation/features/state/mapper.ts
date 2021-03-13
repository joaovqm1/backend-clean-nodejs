import { fromAnyReadRequestToReadRequestDTO } from '@/data'
import {
  ReadCrudRequestDTO,
  ReadStateResponseDTO
} from '@/domain'
import { BaseCrudViewModelMapper } from '@/presentation/base-crud-view-model-mapper'

export interface ReadStateRequestViewModel {
  id?: number
}
export interface ReadStateResponseViewModel
  extends ReadStateResponseDTO { }

export class StateViewModelMapper implements BaseCrudViewModelMapper {
  fromReadRequestViewModelToReadRequestDTO(request: ReadStateRequestViewModel): ReadCrudRequestDTO {
    return fromAnyReadRequestToReadRequestDTO({ request })
  }

  fromReadOneResponseDTOToReadResponseOneViewModel(response: ReadStateResponseDTO): ReadStateResponseViewModel {
    return response
  }

  fromReadManyResponseDTOToReadResponseOneViewModel(response: ReadStateResponseDTO[]): ReadStateResponseViewModel[] {
    return response.map(this.fromReadOneResponseDTOToReadResponseOneViewModel)
  }
}
