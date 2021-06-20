import { BaseEntity } from '@/domain/base-entity'
export interface DocumentEntity extends BaseEntity {
  id: number
  description: string
  key: string
  name: string
  path: string
  extension: string
  mimeType: string
  size: number
}
