import { CreateCrudRepository } from '@/data'
import { CreateApi } from '@/infra/repositories/contracts'

export class CreateCrudRepositoryImpl implements CreateCrudRepository {
  constructor(private readonly createApi: CreateApi) {}

  async create(object: any): Promise<any> {
    return await this.createApi.create(object)
  }
}
