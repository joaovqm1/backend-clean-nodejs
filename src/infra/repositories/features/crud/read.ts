import { ReadCrudRepository } from '@/data'
import { Filter, GetManyResult } from '@/domain'
import { ReadApi } from '@/infra/repositories/contracts'

export class ReadCrudRepositoryImpl implements ReadCrudRepository {
  constructor(private readonly readApi: ReadApi) { }

  async getOne(filters: Filter[]): Promise<any> {
    return await this.readApi.get(filters)
  }

  async getMany(filters: Filter[]): Promise<GetManyResult> {
    return await this.readApi.getMany(filters)
  }
}
