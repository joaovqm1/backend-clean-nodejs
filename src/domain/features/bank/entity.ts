import { BaseEntity } from '@/domain/base-entity'

export interface BankEntity extends BaseEntity {
  id: number
  name: string
  number: string
}
