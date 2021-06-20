import { UserIdentification } from '@/data/contracts'
import { FilterBuilder } from '@/data/filter-builder'
import {
  Filter,
  GetManyResult,
  MissingIdError,
  OfficeEntity,
  officeFieldsToInclude,
  ReadCrudUseCase,
  ReadOfficeResponseDTO,
  ReadOfficeUseCase,
  UnauthorizedOfficeAcesssError,
  UnauthorizedOfficesAcesssError
} from '@/domain'

interface Params {
  readCrudUseCase: ReadCrudUseCase<OfficeEntity>
  userIdentification: UserIdentification
}

export class ReadOfficeUseCaseImpl implements ReadOfficeUseCase {
  private readonly readCrudUseCase: ReadCrudUseCase<OfficeEntity>
  private readonly userIdentification: UserIdentification

  constructor(params: Params) {
    this.readCrudUseCase = params.readCrudUseCase
    this.userIdentification = params.userIdentification
  }

  async getOfficeForLoggedUser(id: number): Promise<OfficeEntity> {
    return this.getById(id)
  }

  async getById(id: number): Promise<OfficeEntity> {
    const filters: Filter[] = new FilterBuilder()
      .equalTo('id', id)
      .include(officeFieldsToInclude)
      .build()

    return this.readCrudUseCase.getOne(filters)
  }

  async fetchAfterCreation(id: number): Promise<ReadOfficeResponseDTO> {
    return this.getById(id)
  }

  async fetchAfterUpdate(id: number): Promise<ReadOfficeResponseDTO> {
    return this.getById(id)
  }

  async getOne(filters: Filter[]): Promise<ReadOfficeResponseDTO> {
    const id = filters.find(filter => filter.name === 'equalTo' && filter.field === 'id')?.value

    if (id === undefined) {
      throw new MissingIdError()
    }

    if (+id !== this.userIdentification.officeId) {
      throw new UnauthorizedOfficeAcesssError()
    }

    const include = filters.find(filter => filter.name === 'include')
    if (include === undefined) {
      const includeFilter = new FilterBuilder()
        .include(officeFieldsToInclude)
        .build()

      return this.readCrudUseCase.getOne(filters.concat(includeFilter))
    } else {
      return this.readCrudUseCase.getOne(filters)
    }

  }

  async getMany(filters: Filter[]): Promise<GetManyResult> {
    throw new UnauthorizedOfficesAcesssError()
  }
}
