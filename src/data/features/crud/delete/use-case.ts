import { DeleteCrudRepository } from './repository'
import {
  DeleteCrudUseCase,
  DeleteCrudRequestDTO,
  DeleteCrudResponseDTO,
  ObjectToDeleteNotFound,
} from '@/domain'

interface Params {
  repository: DeleteCrudRepository
}
export class DeleteCrudUseCaseImpl implements DeleteCrudUseCase {
  private readonly repository: DeleteCrudRepository
  constructor(params: Params) {
    this.repository = params.repository
  }

  async delete(request: DeleteCrudRequestDTO): Promise<DeleteCrudResponseDTO> {
    const object = await this.repository.get(request)
    if (object) {
      await this.repository.delete(request)
      return 'Item removido com sucesso'
    } else {
      throw new ObjectToDeleteNotFound()
    }
  }
}
