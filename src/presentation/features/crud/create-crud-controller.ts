import { BaseCrudViewModelMapper } from '@/presentation/base-crud-view-model-mapper'
import {
  CreateCrudUseCase,
  CreateCrudRequestDTO,
  CreateCrudResponseDTO,
} from '@/domain/features/crud'
import {
  Controller,
  HttpResponse,
  serverError,
  ok,
} from '@/presentation/contracts'

export class CreateCrudController implements Controller {
  constructor(
    private readonly createCrudUseCase: CreateCrudUseCase<
    CreateCrudRequestDTO,
    CreateCrudResponseDTO
    >,
    private readonly crudViewModelMapper: BaseCrudViewModelMapper
  ) {}

  async handle(body: any): Promise<HttpResponse<CreateCrudResponseDTO>> {
    try {
      const requestDTO = this.crudViewModelMapper.fromCreateRequestViewModelToCreateRequestDTO(
        body
      )
      const responseDTO: any = await this.createCrudUseCase.create(requestDTO)
      const responseViewModel = this.crudViewModelMapper.fromCreateResponseDTOToCreateResponseViewModel(
        responseDTO
      )

      return ok(responseViewModel)
    } catch (error) {
      return serverError(error)
    }
  }
}
