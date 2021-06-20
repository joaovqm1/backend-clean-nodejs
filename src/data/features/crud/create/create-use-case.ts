import { BaseModelMapper } from '@/data/mapper'
import { AfterCreateCrudUseCase, CreateCrudUseCase } from '@/domain/features/'

import { CreateCrudRepository } from './repository'

interface Params<ResponseDTO> {
  repository: CreateCrudRepository
  modelMapper: BaseModelMapper
  afterCreateUseCase: AfterCreateCrudUseCase<ResponseDTO>
}

export class CreateCrudUseCaseImpl<RequestDTO, ResponseDTO> implements CreateCrudUseCase<RequestDTO, ResponseDTO> {
  private readonly repository: CreateCrudRepository
  private readonly modelMapper: BaseModelMapper
  private readonly afterCreateUseCase: AfterCreateCrudUseCase<ResponseDTO>

  constructor(params: Params<ResponseDTO>) {
    this.repository = params.repository
    this.modelMapper = params.modelMapper
    this.afterCreateUseCase = params.afterCreateUseCase
  }

  async create(request: RequestDTO): Promise<ResponseDTO> {
    const objectModel = this.modelMapper.fromCreateRequestDTOToModel(request)
    const newObject: any = await this.repository.create(objectModel)
    return this.afterCreateUseCase.fetchAfterCreation(newObject.id)
  }
}
