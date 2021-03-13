import {
  ReadCityResponseDTO,
} from '@/domain'
import { CityModelMapper } from '@/data'
import { CityViewModelMapper } from '@/presentation'
import { CrudFactory } from './crud'
import { RequestParamsWithUser } from '../request-params'

export class CityFactory {
  private readonly CityCrudFactory: CrudFactory<undefined, ReadCityResponseDTO, ReadCityResponseDTO, undefined>
  private readonly modelMapper: CityModelMapper

  constructor(readonly requestParams: RequestParamsWithUser) {
    this.modelMapper = new CityModelMapper()
    this.CityCrudFactory = new CrudFactory<undefined, ReadCityResponseDTO, ReadCityResponseDTO, undefined>({
      requestParams,
      entityName: 'city',
      modelMapper: this.modelMapper,
      viewModelMapper: new CityViewModelMapper()
    })
  }

  getControllerFacade(): any {
    return this.CityCrudFactory.getControllerFacade()
  }
}
