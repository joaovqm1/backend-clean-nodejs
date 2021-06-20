import { BaseModelMapper } from '@/data/mapper'
import {
  CreateScopeRequestDTO,
  ReadScopeResponseDTO,
  UpdateScopeRequestDTO,
} from '@/domain'

import { ScopeModel } from './model'

export class ScopeModelMapper implements BaseModelMapper {
  fromCreateRequestDTOToModel(
    request: CreateScopeRequestDTO
  ): Omit<ScopeModel, 'id'> {
    return this.fromCreateUpdateRequestDTOToModel(request)
  }

  fromCreateUpdateRequestDTOToModel(
    request: CreateScopeRequestDTO | UpdateScopeRequestDTO
  ): Omit<ScopeModel, 'id'> {
    return {
      ...request,
      description: request.description.toUpperCase()
    }
  }

  fromUpdateRequestDTOToModel(
    request: UpdateScopeRequestDTO
  ): ScopeModel {
    return this.fromCreateUpdateRequestDTOToModel(request) as ScopeModel
  }

  fromModelToReadOneResponse(model: ScopeModel): ReadScopeResponseDTO {
    return {
      ...model
    }
  }

  fromModelToReadManyResponse(
    models: ScopeModel[]
  ): ReadScopeResponseDTO[] {
    return models.map(this.fromModelToReadOneResponse)
  }
}
