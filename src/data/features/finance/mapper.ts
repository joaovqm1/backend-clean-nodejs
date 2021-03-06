import { BaseModelMapper } from '@/data/mapper'
import {
  CreateFinanceRequestDTO,
  ReadFinanceResponseDTO,
  UpdateFinanceRequestDTO,
} from '@/domain'

import { FinanceModel } from './model'

export class FinanceModelMapper implements BaseModelMapper {
  fromCreateRequestDTOToModel(request: CreateFinanceRequestDTO): Omit<FinanceModel, 'id' | 'customerSupplier' | 'financeType' | 'financeMethod'> {
    return this.fromCreateUpdateRequestDTOToModel(request)
  }

  fromCreateUpdateRequestDTOToModel(request: CreateFinanceRequestDTO | UpdateFinanceRequestDTO): Omit<FinanceModel, 'id' | 'customerSupplier' | 'financeType' | 'financeMethod'> {
    const financeTypeId = request.financeType?.id
    const financeMethodId = request.financeMethod?.id
    const customerSupplierId = request.customerSupplier.id

    delete request.customerSupplier
    delete request.financeMethod
    delete request.financeType

    return {
      ...request,
      customerSupplierId,
      financeMethodId,
      financeTypeId,
      description: request.description.toUpperCase(),
    }
  }

  fromUpdateRequestDTOToModel(request: UpdateFinanceRequestDTO): Omit<FinanceModel, 'customerSupplier' | 'financeType' | 'financeMethod'> {
    return this.fromCreateUpdateRequestDTOToModel(request) as FinanceModel
  }

  fromModelToReadOneResponse(model: FinanceModel): ReadFinanceResponseDTO {
    delete model.customerSupplierId
    delete model.financeMethodId
    delete model.financeTypeId
    return {
      ...model
    }
  }

  fromModelToReadManyResponse(models: FinanceModel[]): ReadFinanceResponseDTO[] {
    return models.map(this.fromModelToReadOneResponse)
  }
}
