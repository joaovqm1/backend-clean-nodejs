import { fromAnyReadRequestToReadRequestDTO } from '@/data'
import {
  ReadCrudRequestDTO,
  ReadCityResponseDTO,
  cityFieldsToInclude
} from '@/domain'
import { BaseCrudViewModelMapper } from '@/presentation/base-crud-view-model-mapper'

export interface ReadCityRequestViewModel {
  id?: number
  stateId?: number
}
export interface ReadCityResponseViewModel extends ReadCityResponseDTO { }

export class CityViewModelMapper implements BaseCrudViewModelMapper {
  fromReadRequestViewModelToReadRequestDTO(request: ReadCityRequestViewModel): ReadCrudRequestDTO {
    return fromAnyReadRequestToReadRequestDTO({ request, fieldsToInclude: cityFieldsToInclude })
  }

  fromReadOneResponseDTOToReadResponseOneViewModel(response: ReadCityResponseDTO): ReadCityResponseViewModel {
    return response
  }

  fromReadManyResponseDTOToReadResponseOneViewModel(response: ReadCityResponseDTO[]): ReadCityResponseViewModel[] {
    return response.map(this.fromReadOneResponseDTOToReadResponseOneViewModel)
  }
}
