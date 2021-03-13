import { BaseCrudViewModelMapper } from '@/presentation/base-crud-view-model-mapper'
import {
  GetManyResult,
  ReadCrudResponseDTO,
  ReadCrudUseCase,
} from '@/domain/features/crud'
import {
  Controller,
  HttpResponse,
  serverError,
  ok,
} from '@/presentation/contracts'

export class ReadManyCrudController implements Controller {
  constructor(
    private readonly readManyCrudUseCase: ReadCrudUseCase<ReadCrudResponseDTO>,
    private readonly crudViewModelMapper: BaseCrudViewModelMapper
  ) {}

  async handle(query: any): Promise<HttpResponse<GetManyResult>> {
    try {
      const requestDTO = this.crudViewModelMapper.fromReadRequestViewModelToReadRequestDTO(
        query
      )
      const responseDTO: GetManyResult = await this.readManyCrudUseCase.getMany(
        requestDTO
      )
      return ok({
        ...responseDTO,
        items: this.crudViewModelMapper.fromReadManyResponseDTOToReadResponseOneViewModel(
          responseDTO.items
        ),
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
