import { FinanceEntity } from '../entity'

export interface CreateFinanceRequestDTO extends Omit<FinanceEntity, 'id' | 'financeType' | 'financeMethod'> {
  financeType: {
    id: number
  }
  financeMethod?: {
    id: number
  }
}
export interface CreateFinanceResponseDTO extends FinanceEntity { }
