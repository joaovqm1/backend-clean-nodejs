import { Filter } from '@/domain'

export interface QueryCreater {
  create: (filters: Filter[]) => any
}
