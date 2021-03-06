import { BaseModelMapper } from '@/data/mapper'
import { ReadStateResponseDTO } from '@/domain'

import { StateModel } from './model'

export class StateModelMapper implements BaseModelMapper {
  fromModelToReadOneResponse(model: StateModel): ReadStateResponseDTO {
    return model
  }

  fromModelToReadManyResponse(models: StateModel[]): ReadStateResponseDTO[] {
    return models.map(this.fromModelToReadOneResponse)
  }
}
