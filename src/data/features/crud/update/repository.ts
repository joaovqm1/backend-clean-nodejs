import { Filter } from '@/data/contracts'

export interface UpdateCrudRepository {
  update: (object: any) => Promise<any>
  get: (filters: Filter[]) => Promise<any>
}
