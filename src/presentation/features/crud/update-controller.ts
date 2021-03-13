import { BaseCrudViewModelMapper } from '@/presentation/base-crud-view-model-mapper'
import {
  UpdateCrudUseCase,
  UpdateCrudRequestDTO,
  UpdateCrudResponse,
} from '@/domain'
import {
  Controller,
  HttpResponse,
  serverError,
  ok,
} from '@/presentation/contracts'

export class UpdateCrudController implements Controller {
  constructor(
    private readonly updateCrudUseCase: UpdateCrudUseCase<
    UpdateCrudRequestDTO,
    UpdateCrudResponse
    >,
    private readonly crudViewModelMapper: BaseCrudViewModelMapper
  ) {}

  async handle(body: any): Promise<HttpResponse<UpdateCrudResponse>> {
    try {
      const requestDTO = this.crudViewModelMapper.fromUpdateRequestViewModelToUpdateRequestDTO(
        body
      )
      const responseDTO: UpdateCrudResponse = await this.updateCrudUseCase.update(
        requestDTO
      )
      const responseViewModel = this.crudViewModelMapper.fromUpdateResponseDTOToUpdateResponseViewModel(
        responseDTO
      )

      return ok(responseViewModel)
    } catch (error) {
      return serverError(error)
    }
  }
}
