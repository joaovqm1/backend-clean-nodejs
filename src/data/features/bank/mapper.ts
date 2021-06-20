import { BaseModelMapper } from '@/data/mapper'
import {
  CreateBankRequestDTO,
  ReadBankResponseDTO,
  UpdateBankRequestDTO,
} from '@/domain'

import { BankModel } from './model'

export class BankModelMapper implements BaseModelMapper {
  fromCreateRequestDTOToModel(
    request: CreateBankRequestDTO
  ): Omit<BankModel, 'id'> {
    return {
      ...request,
      name: request.name.toUpperCase(),
      number: request.number.toUpperCase()
    }
  }

  fromModelToReadOneResponse(model: BankModel): ReadBankResponseDTO {
    return {
      ...model
    }
  }

  fromModelToReadManyResponse(
    models: BankModel[]
  ): ReadBankResponseDTO[] {
    return models.map(this.fromModelToReadOneResponse)
  }

  fromUpdateRequestDTOToModel(
    request: UpdateBankRequestDTO
  ): BankModel {
    return {
      ...request
    }
  }
}
