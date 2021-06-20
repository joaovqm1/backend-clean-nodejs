import { BaseEntity } from '@/domain/base-entity'

export interface FinanceMethodEntity extends BaseEntity {
  id: number
  description: string
}
