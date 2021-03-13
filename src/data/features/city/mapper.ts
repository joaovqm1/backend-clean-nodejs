import { ReadCityResponseDTO } from '@/domain'
import { BaseModelMapper } from '@/data/mapper'
import { CityModel } from './model'

export class CityModelMapper implements BaseModelMapper {
  fromModelToReadOneResponse(model: CityModel): ReadCityResponseDTO {
    return model
  }

  fromModelToReadManyResponse(models: CityModel[]): ReadCityResponseDTO[] {
    return models.map(this.fromModelToReadOneResponse)
  }
}
