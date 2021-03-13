import { UserIdentification } from '@/data/contracts'
import { fromAnyReadRequestToReadRequestDTO } from '@/data/request-to-fields'
import {
  ReadCrudUseCase,
  OfficeEntity,
  ReadOfficeUseCase,
  ReadCrudRequestDTO,
  ReadOfficeResponseDTO,
  UnauthorizedOfficeAcesssError,
  GetManyResult,
  UnauthorizedOfficesAcesssError,
  officeFieldsToInclude
} from '@/domain'
import { MissingIdError } from '@/domain/features/office/read/errors/id-not-informed'

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
    const request = this.getRequestByIdWithIncludes(id)
    return this.readCrudUseCase.getOne(request)
  }

  getRequestByIdWithIncludes(id: number): ReadCrudRequestDTO {
    const request: any = { id }
    return fromAnyReadRequestToReadRequestDTO({ request, fieldsToInclude: officeFieldsToInclude })
  }

  async fetchAfterCreation(id: number): Promise<ReadOfficeResponseDTO> {
    return this.getById(id)
  }

  async fetchAfterUpdate(id: number): Promise<ReadOfficeResponseDTO> {
    return this.getById(id)
  }

  async getOne(query: ReadCrudRequestDTO): Promise<ReadOfficeResponseDTO> {
    const filter = query.filters[0]
    const id = filter.equalTo?.id

    if (id === undefined) {
      throw new MissingIdError()
    }

    if (+id !== this.userIdentification.officeId) {
      throw new UnauthorizedOfficeAcesssError()
    }

    if (query.fieldsToInclude === undefined) {
      query.fieldsToInclude = officeFieldsToInclude
    }

    return this.readCrudUseCase.getOne(query)
  }

  async getMany(query: ReadCrudRequestDTO): Promise<GetManyResult> {
    throw new UnauthorizedOfficesAcesssError()
  }
}
