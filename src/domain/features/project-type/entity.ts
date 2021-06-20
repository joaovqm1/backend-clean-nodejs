import { BaseEntity } from '@/domain/base-entity'

export interface ProjectTypeEntity extends BaseEntity {
  id: number
  description: string
}
