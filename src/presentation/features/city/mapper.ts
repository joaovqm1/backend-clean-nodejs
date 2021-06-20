import {
  cityFieldsToInclude,
  Filter,
  ReadCityResponseDTO,
} from '@/domain'
import { BaseCrudViewModelMapper } from '@/presentation/base-crud-view-model-mapper'
import { transformRequestToFilters } from '@/presentation/request-to-filters'

export interface ReadCityRequestViewModel {
  id?: number
  stateId?: number
}
export interface ReadCityResponseViewModel extends ReadCityResponseDTO { }

export class CityViewModelMapper implements BaseCrudViewModelMapper {
  fromReadRequestViewModelToFilters(request: ReadCityRequestViewModel): Filter[] {
    return transformRequestToFilters({
      request,
      fieldsAndFilters: {
        id: 'equalTo',
        stateId: 'equalTo'
      },
      fieldsToInclude: cityFieldsToInclude
    })
  }

  fromReadOneResponseDTOToReadResponseOneViewModel(response: ReadCityResponseDTO): ReadCityResponseViewModel {
    return response
  }

  fromReadManyResponseDTOToReadResponseOneViewModel(response: ReadCityResponseDTO[]): ReadCityResponseViewModel[] {
    return response.map(this.fromReadOneResponseDTOToReadResponseOneViewModel)
  }
}
