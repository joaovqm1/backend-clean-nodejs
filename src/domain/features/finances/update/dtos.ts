import { FinanceEntity } from '../entity'

export interface UpdateFinanceRequestDTO extends Omit<FinanceEntity, 'financeType' | 'financeMethod'> {
  financeType: {
    id: number
  }
  financeMethod?: {
    id: number
  }
}
export interface UpdateFinanceResponseDTO extends FinanceEntity { }
