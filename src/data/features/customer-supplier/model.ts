import { CustomerSupplierEntity } from '@/domain'

export interface CustomerSupplierModel extends CustomerSupplierEntity {
  cityId?: number
  stateId?: number
  bankId?: number
}
