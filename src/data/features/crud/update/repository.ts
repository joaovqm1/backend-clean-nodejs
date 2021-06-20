import { Filter } from '@/domain'
export interface UpdateCrudRepository {
  update: (object: any) => Promise<any>
  get: (filters: Filter[]) => Promise<any>
}
