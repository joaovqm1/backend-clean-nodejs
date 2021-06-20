import { ProjectPaymentRequestDTO } from '@/domain/features/common'

import { ReadFinanceResponseDTO } from '../read'

export interface CreateFinancesForProjectRequestDTO {
  project: {
    id: number
    name: string
    customer: {
      id: number
    }
  }
  payment: ProjectPaymentRequestDTO
}

export type CreateFinancesForProjectResponseDTO =
  Omit<ReadFinanceResponseDTO, 'customerSupplier' | 'financeType' | 'financeMethod' | 'project'>
export interface CreateFinancesForProjectUseCase {
  create: (request: CreateFinancesForProjectRequestDTO) => Promise<CreateFinancesForProjectResponseDTO[]>
}
