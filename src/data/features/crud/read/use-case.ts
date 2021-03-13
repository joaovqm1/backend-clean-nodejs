import { ReadCrudRepository } from './repository'
import {
  GetManyResult,
  ReadCrudRequestDTO,
  ReadCrudUseCase,
  ReadObjectNotFoundError,
} from '@/domain'
import { FilterTransformer, Filter } from '@/data/contracts'
import { BaseModelMapper } from '@/data/mapper'

interface Params {
  repository: ReadCrudRepository
  filterTransformer: FilterTransformer
  modelMapper: BaseModelMapper
}

export class ReadCrudUseCaseImpl<
  ReadOneResponseDTO,
  ReadManyResponseDTO = ReadOneResponseDTO
> implements ReadCrudUseCase<ReadOneResponseDTO, ReadManyResponseDTO> {
  private readonly repository: ReadCrudRepository
  private readonly filterTransformer: FilterTransformer
  private readonly modelMapper: BaseModelMapper

  constructor(params: Params) {
    this.repository = params.repository
    this.filterTransformer = params.filterTransformer
    this.modelMapper = params.modelMapper
  }

  async getOne(query: ReadCrudRequestDTO): Promise<ReadOneResponseDTO> {
    const filters: Filter[] = this.filterTransformer.transformQueryToFilters(
      query
    )
    const model: any = await this.repository.getOne(filters)
    if (!model) {
      throw new ReadObjectNotFoundError()
    } else {
      return this.modelMapper.fromModelToReadOneResponse(model)
    }
  }

  async getMany(query: ReadCrudRequestDTO): Promise<GetManyResult> {
    const filters: Filter[] = this.filterTransformer.transformQueryToFilters(
      query
    )
    const result: GetManyResult = await this.repository.getMany(filters)
    return {
      ...result,
      items: this.modelMapper.fromModelToReadManyResponse(result.items),
    }
  }
}
