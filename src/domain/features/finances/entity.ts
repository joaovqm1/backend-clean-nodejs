import { BaseEntity } from '@/domain/base-entity'

import { FinanceStatus } from '../common'
import { FinanceMethodEntity } from '../finance-method'
import { FinanceTypeEntity } from '../finance-type'

export interface FinanceEntity extends BaseEntity {
  id: number
  description: string
  customerSupplier: CustomerSupplier
  type: FinanceType
  status: FinanceStatus
  finishDate?: string
  dateToFinish?: string
  value: number
  financeType: Pick<FinanceTypeEntity, 'id' | 'description'>
  financeMethod?: Pick<FinanceMethodEntity, 'id' | 'description'>
}
interface CustomerSupplier {
  id: number
  name?: string
}

export enum FinanceType {
  INCOME = 'RECEITA',
  EXPENSE = 'DESPESA',
}



export const financeFieldsToInclude = [
  'customerSupplier.id',
  'customerSupplier.name',
  'financeType.id',
  'financeType.description',
  'financeMethod.id',
  'financeMethod.description'
]
