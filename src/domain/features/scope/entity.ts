import { BaseEntity } from '@/domain/base-entity'

export interface ScopeEntity extends BaseEntity {
  id: number
  description: string
}
