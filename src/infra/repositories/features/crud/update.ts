import { Filter, UpdateCrudRepository } from '@/data'
import { ReadApi, UpdateApi } from '@/infra/repositories/contracts'

export class UpdateCrudRepositoryImpl implements UpdateCrudRepository {
  constructor(
    private readonly updateApi: UpdateApi,
    private readonly readApi: ReadApi
  ) {}

  async update(object: any): Promise<any> {
    return await this.updateApi.update(object)
  }

  async get(filters: Filter[]): Promise<any> {
    return await this.readApi.get(filters)
  }
}
