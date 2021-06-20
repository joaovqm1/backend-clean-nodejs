import { FinanceMethodEntity } from '../entity'

export interface CreateFinanceMethodRequestDTO
  extends Omit<FinanceMethodEntity, 'id'> {}
export interface CreateFinanceMethodResponseDTO
  extends FinanceMethodEntity {}
