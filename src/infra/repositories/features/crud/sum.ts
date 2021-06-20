import { SumCrudRepository, SumCrudRepositoryRequest } from '@/data'
import { SumApi } from '@/infra/repositories/contracts'

export class SumCrudRepositoryImpl implements SumCrudRepository {
  constructor(private readonly sumApi: SumApi) { }

  async sum(request: SumCrudRepositoryRequest): Promise<number> {
    return await this.sumApi.sum(request)
  }
}
