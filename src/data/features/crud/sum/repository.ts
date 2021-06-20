import { Filter } from '@/domain'

export interface SumCrudRepositoryRequest {
  field: string
  filters?: Filter[]
}

export interface SumCrudRepository {
  sum: (request: SumCrudRepositoryRequest) => Promise<number>
}
