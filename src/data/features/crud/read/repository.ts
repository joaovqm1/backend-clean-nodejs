import { Filter } from '@/data/contracts/filters'
import { GetManyResult } from '@/domain'

export interface ReadCrudRepository {
  getOne: (filters: Filter[]) => Promise<any>
  getMany: (query: Filter[]) => Promise<GetManyResult>
}
