import { FilterBuilder } from '@/data/filter-builder'
import { BaseModelMapper } from '@/data/mapper'
import {
  Filter,
  GetManyResult,
  ReadCrudUseCase,
} from '@/domain'

import { ReadCrudRepository } from './repository'
interface Params {
  repository: ReadCrudRepository
  modelMapper: BaseModelMapper
  defaultGetManyFilters?: Filter[]
}

export class ReadCrudUseCaseImpl<ReadOneResponseDTO, ReadManyResponseDTO = ReadOneResponseDTO> implements ReadCrudUseCase<ReadOneResponseDTO, ReadManyResponseDTO> {
  private readonly repository: ReadCrudRepository
  private readonly modelMapper: BaseModelMapper
  private readonly defaultGetManyFilters: Filter[]

  constructor(params: Params) {
    this.repository = params.repository
    this.modelMapper = params.modelMapper
    this.defaultGetManyFilters = params.defaultGetManyFilters || []
  }

  async getOne(filters: Filter[]): Promise<ReadOneResponseDTO | undefined> {
    const model: any = await this.repository.getOne(filters)
    if (!model) {
      return undefined
    } else {
      return this.modelMapper.fromModelToReadOneResponse(model)
    }
  }

  async getMany(filters: Filter[]): Promise<GetManyResult> {
    const result: GetManyResult = await this.repository.getMany(filters.concat(this.defaultGetManyFilters))
    return {
      ...result,
      items: this.modelMapper.fromModelToReadManyResponse(result.items),
    }
  }

  async getById(id: number, extraFilters: Filter[] = []): Promise<ReadOneResponseDTO> {
    const filters: Filter[] = new FilterBuilder()
      .equalTo('id', id)
      .build()

    return this.getOne(filters.concat(extraFilters))
  }
}
