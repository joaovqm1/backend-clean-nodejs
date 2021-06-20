import { SumCrudRepositoryRequest } from '@/data'

export interface SumApi {
  sum: (request: SumCrudRepositoryRequest) => Promise<number>
}
