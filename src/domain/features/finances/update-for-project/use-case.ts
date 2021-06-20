import { ProjectPaymentRequestDTO } from '@/domain/features/common'

import { ReadFinanceResponseDTO } from '../read'
interface Project {
  id: number
  name: string
  customer: {
    id: number
  }
}
export interface UpdateFinancesForProjectRequestDTO {
  project: Project
  payment: ProjectPaymentRequestDTO
}

export type UpdateFinancesForProjectResponseDTO = Omit<ReadFinanceResponseDTO, 'customerSupplier' | 'financeType' | 'financeMethod' | 'project'>
export interface UpdateFinancesForProjectUseCase {
  update: (request: UpdateFinancesForProjectRequestDTO) => Promise<UpdateFinancesForProjectResponseDTO[]>
}
