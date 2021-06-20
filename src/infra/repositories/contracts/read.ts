import { Filter, GetManyResult } from '@/domain'
export interface ReadApi {
  get: (filters: Filter[]) => Promise<any>
  getMany: (filters: Filter[]) => Promise<GetManyResult>
}
