import {
  DeleteCrudRequestDTO,
  DeleteCrudResponseDTO,
  DeleteCrudUseCase,
  ObjectToDeleteNotFound,
} from '@/domain'

import { DeleteCrudRepository } from './repository'

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
