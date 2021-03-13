import { BaseCrudViewModelMapper } from '@/presentation/base-crud-view-model-mapper'
import { ReadCrudResponseDTO, ReadCrudUseCase } from '@/domain/features/crud'
import {
  Controller,
  HttpResponse,
  serverError,
  ok,
} from '@/presentation/contracts'

export class ReadOneCrudController implements Controller {
  constructor(
    private readonly readCrudUseCase: ReadCrudUseCase<ReadCrudResponseDTO>,
    private readonly crudViewModelMapper: BaseCrudViewModelMapper
  ) {}

  async handle(query: any): Promise<HttpResponse<ReadCrudResponseDTO>> {
    try {
      const requestDTO = this.crudViewModelMapper.fromReadRequestViewModelToReadRequestDTO(
        query
      )
      const responseDTO: ReadCrudResponseDTO = await this.readCrudUseCase.getOne(
        requestDTO
      )
      const responseViewModel = this.crudViewModelMapper.fromReadOneResponseDTOToReadResponseOneViewModel(
        responseDTO
      )

      return ok(responseViewModel)
    } catch (error) {
      return serverError(error)
    }
  }
}
