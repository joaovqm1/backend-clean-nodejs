import { DeleteCrudRepository, FilterBuilder, ReadCrudRepository } from '@/data'
import { DeleteApi } from '@/infra/repositories/contracts'

export class DeleteCrudRepositoryImpl implements DeleteCrudRepository {
  constructor(
    private readonly deleteApi: DeleteApi,
    private readonly getRepository: ReadCrudRepository
  ) {}

  async get(id: number): Promise<any> {
    const filters = new FilterBuilder().equalTo('id', id).build()
    return this.getRepository.getOne(filters)
  }

  async delete(id: number): Promise<void> {
    return this.deleteApi.delete(id)
  }
}
