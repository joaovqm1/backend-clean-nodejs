import { OfficeEntity } from '@/domain'

export interface OfficeModel extends OfficeEntity {
  planId: number
  stateId: number
  cityId: number
}
