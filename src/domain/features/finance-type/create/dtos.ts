import { FinanceTypeEntity } from '../entity'

export interface CreateFinanceTypeRequestDTO
  extends Omit<FinanceTypeEntity, 'id'> {}
export interface CreateFinanceTypeResponseDTO
  extends FinanceTypeEntity {}
