import { fromAnyReadRequestToReadRequestDTO } from '@/data/request-to-fields'
import {
  ReadCrudUseCase,
  ReadCrudRequestDTO,
  ReadUserUseCase,
  ReadUserResponseDTO,
  UserEntity,
  userFieldsToInclude,
} from '@/domain'

interface Params {
  readCrudUseCase: ReadCrudUseCase<UserEntity>
}
export class ReadUserUseCaseImpl implements ReadUserUseCase {
  private readonly readCrudUseCase: ReadCrudUseCase<UserEntity>

  constructor(params: Params) {
    this.readCrudUseCase = params.readCrudUseCase
  }

  async getById(id: number): Promise<UserEntity> {
    const request = this.getRequestByIdWithIncludes(id)
    return this.readCrudUseCase.getOne(request)
  }

  getRequestByIdWithIncludes(id: number): ReadCrudRequestDTO {
    const request: any = { id }
    return fromAnyReadRequestToReadRequestDTO({ request, fieldsToInclude: userFieldsToInclude })
  }

  async fetchAfterCreation(id: number): Promise<ReadUserResponseDTO> {
    return this.getById(id)
  }

  async fetchAfterUpdate(id: number): Promise<ReadUserResponseDTO> {
    return this.getById(id)
  }
}
