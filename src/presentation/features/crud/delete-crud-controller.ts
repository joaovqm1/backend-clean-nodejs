import { DeleteCrudUseCase, DeleteCrudResponseDTO } from '@/domain'
import {
  Controller,
  HttpResponse,
  serverError,
  ok,
} from '@/presentation/contracts'

interface DeleteCrudParams {
  id: number
}

export class DeleteCrudController implements Controller {
  constructor(private readonly deleteCrudUseCase: DeleteCrudUseCase) {}

  async handle(
    params: DeleteCrudParams
  ): Promise<HttpResponse<DeleteCrudResponseDTO>> {
    try {
      const response: DeleteCrudResponseDTO = await this.deleteCrudUseCase.delete(
        params.id
      )
      return ok(response)
    } catch (error) {
      return serverError(error)
    }
  }
}
