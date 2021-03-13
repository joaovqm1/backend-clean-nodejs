import { UpdateCrudRepository } from './repository'
import {
  UpdateCrudUseCase,
  ObjectToUpdateNotFoundError,
  AfterUpdateCrudUseCase,
} from '@/domain'
import { BaseModelMapper } from '@/data/mapper'
import { BaseModel } from '@/data/model'
import { FilterBuilder } from '@/data/filter-builder'
import { Filter } from '@/data/contracts'

type UpdateRequestDTO = {
  id: number
}

interface Params<ResponseDTO> {
  repository: UpdateCrudRepository
  modelMapper: BaseModelMapper
  afterUpdateCrudUseCase: AfterUpdateCrudUseCase<ResponseDTO>
}

export class UpdateCrudUseCaseImpl<
  RequestDTO extends UpdateRequestDTO,
  ResponseDTO
> implements UpdateCrudUseCase<RequestDTO, ResponseDTO> {
  private readonly repository: UpdateCrudRepository
  private readonly modelMapper: BaseModelMapper
  private readonly afterUpdateCrudUseCase: AfterUpdateCrudUseCase<ResponseDTO>

  constructor(params: Params<ResponseDTO>) {
    this.repository = params.repository
    this.modelMapper = params.modelMapper
    this.afterUpdateCrudUseCase = params.afterUpdateCrudUseCase
  }

  async update(request: RequestDTO): Promise<ResponseDTO> {
    await this.verifyCurrentObject(request.id)

    const objectToUpdate: BaseModel = this.modelMapper.fromUpdateRequestDTOToModel(
      request
    )
    const updatedObject = await this.repository.update(objectToUpdate)

    const fetchedObject = await this.afterUpdateCrudUseCase.fetchAfterUpdate(
      updatedObject.id
    )

    return fetchedObject
  }

  async verifyCurrentObject(id: number): Promise<void> {
    const filters: Filter[] = new FilterBuilder().equalTo('id', id).build()

    const currentObject: any = await this.repository.get(filters)
    if (!currentObject) {
      throw new ObjectToUpdateNotFoundError()
    }
  }
}
