import { BankEntity } from '../entity'

export interface CreateBankRequestDTO
  extends Omit<BankEntity, 'id'> {}
export interface CreateBankResponseDTO
  extends BankEntity {}
