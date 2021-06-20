import { FinanceEntity } from '@/domain'

export interface FinanceModel extends FinanceEntity {
  customerSupplierId?: number
  financeTypeId?: number
  financeMethodId?: number
  projectId?: number
}
