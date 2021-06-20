import { BaseEntity } from '@/domain/base-entity'

export interface FinanceTypeEntity extends BaseEntity {
  id: number
  description: string
  type: FinanceTypeEnum
}

export enum FinanceTypeEnum {
  INCOME = 'RECEITA',
  EXPANSE = 'DESPESA',
  BOTH = 'AMBOS'
}

