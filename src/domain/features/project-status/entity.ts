import { BaseEntity } from '@/domain/base-entity'

export interface ProjectStatusEntity extends BaseEntity {
  id: number
  description: string
}
