import { BaseEntity } from '@/domain/base-entity'

export interface PhasesEntity extends BaseEntity {
  id: number
  description: string
}
