import { BaseModelMapper } from '@/data/mapper'
import {
  CreateFinanceMethodRequestDTO,
  ReadFinanceMethodResponseDTO,
  UpdateFinanceMethodRequestDTO,
} from '@/domain'

import { FinanceMethodModel } from './model'
export class FinanceMethodModelMapper implements BaseModelMapper {
  fromCreateRequestDTOToModel(
    request: CreateFinanceMethodRequestDTO
  ): Omit<FinanceMethodModel, 'id'> {
    return this.fromCreateUpdateRequestDTOToModel(request)
  }

  fromCreateUpdateRequestDTOToModel(
    request: CreateFinanceMethodRequestDTO | UpdateFinanceMethodRequestDTO
  ): Omit<FinanceMethodModel, 'id'> {
    return {
      ...request,
      description: request.description.toUpperCase()
    }
  }

  fromModelToReadOneResponse(model: FinanceMethodModel): ReadFinanceMethodResponseDTO {
    return {
      ...model
    }
  }

  fromModelToReadManyResponse(
    models: FinanceMethodModel[]
  ): ReadFinanceMethodResponseDTO[] {
    return models.map(this.fromModelToReadOneResponse)
  }

  fromUpdateRequestDTOToModel(
    request: UpdateFinanceMethodRequestDTO
  ): FinanceMethodModel {
    return this.fromCreateUpdateRequestDTOToModel(request) as UpdateFinanceMethodRequestDTO
  }
}
