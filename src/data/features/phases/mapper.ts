import { BaseModelMapper } from '@/data/mapper'
import {
  CreatePhasesRequestDTO,
  ReadPhaseResponseDTO,
  UpdatePhasesRequestDTO,
} from '@/domain'

import { PhasesModel } from './model'

export class PhasesModelMapper implements BaseModelMapper {
  fromCreateRequestDTOToModel(
    request: CreatePhasesRequestDTO
  ): Omit<PhasesModel, 'id'> {
    return this.fromCreateUpdateRequestDTOToModel(request)
  }

  fromCreateUpdateRequestDTOToModel(request: CreatePhasesRequestDTO | UpdatePhasesRequestDTO): Omit<PhasesModel, 'id'> | PhasesModel {
    return {
      ...request,
      description: request.description.toUpperCase()
    }
  }

  fromUpdateRequestDTOToModel(
    request: UpdatePhasesRequestDTO
  ): PhasesModel {
    return this.fromCreateUpdateRequestDTOToModel(request) as PhasesModel
  }

  fromModelToReadOneResponse(model: PhasesModel): ReadPhaseResponseDTO {
    return {
      ...model
    }
  }

  fromModelToReadManyResponse(
    models: PhasesModel[]
  ): ReadPhaseResponseDTO[] {
    return models.map(this.fromModelToReadOneResponse)
  }
}
