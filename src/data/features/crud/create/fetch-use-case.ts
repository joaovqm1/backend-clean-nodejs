import { FilterBuilder } from '@/data/filter-builder'
import {
  AfterCreateCrudUseCase,
  Filter,
  ReadCrudUseCase
} from '@/domain'

interface Params {
  readCrudUseCase: ReadCrudUseCase<any>
  fieldsToInclude?: string[]
}

export class AfterCreateCrudUseCaseImpl<ResponseDTO> implements AfterCreateCrudUseCase<ResponseDTO> {
  private readonly readUseCase: ReadCrudUseCase<ResponseDTO>
  private readonly fieldsToInclude?: string[]

  constructor(params: Params) {
    this.readUseCase = params.readCrudUseCase
    this.fieldsToInclude = params.fieldsToInclude
  }

  async fetchAfterCreation(id: number): Promise<ResponseDTO> {
    const extraFilters = this.getExtraFields(this.fieldsToInclude)
    return this.readUseCase.getById(id, extraFilters)
  }

  getExtraFields(fieldsToInclude?: string[]): Filter[] | undefined {
    if (fieldsToInclude) {
      return new FilterBuilder()
        .include(this.fieldsToInclude)
        .build()
    }
  }
}
