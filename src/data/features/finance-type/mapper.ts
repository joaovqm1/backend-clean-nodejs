import { BaseModelMapper } from '@/data/mapper'
import {
  CreateFinanceTypeRequestDTO,
  ReadFinanceTypeResponseDTO,
  UpdateFinanceTypeRequestDTO,
} from '@/domain'

import { FinanceTypeModel } from './model'

export class FinanceTypeModelMapper implements BaseModelMapper {
  fromCreateRequestDTOToModel(
    request: CreateFinanceTypeRequestDTO
  ): Omit<FinanceTypeModel, 'id'> {
    return this.fromCreateUpdateRequestDTOToModel(request)
  }

  fromCreateUpdateRequestDTOToModel(
    request: CreateFinanceTypeRequestDTO | UpdateFinanceTypeRequestDTO
  ): Omit<FinanceTypeModel, 'id'> | FinanceTypeModel {
    return {
      ...request,
      description: request.description.toUpperCase()
    }
  }

  fromUpdateRequestDTOToModel(
    request: UpdateFinanceTypeRequestDTO
  ): FinanceTypeModel {
    return this.fromCreateUpdateRequestDTOToModel(request) as FinanceTypeModel
  }

  fromModelToReadOneResponse(model: FinanceTypeModel): ReadFinanceTypeResponseDTO {
    return {
      ...model
    }
  }

  fromModelToReadManyResponse(
    models: FinanceTypeModel[]
  ): ReadFinanceTypeResponseDTO[] {
    return models.map(this.fromModelToReadOneResponse)
  }
}
