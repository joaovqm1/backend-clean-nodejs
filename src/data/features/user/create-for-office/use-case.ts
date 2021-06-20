import {
  CreateCrudUseCase,
  CreateUserForOfficeUseCase,
  CreateUserRequestDTO,
  ReadUserResponseDTO,
} from '@/domain/features'
import {
  CreateUserForOfficeRequestDTO,
  CreateUserForOfficeResponseDTO,
} from '@/domain/features/'

import { UserModelMapper } from '../mapper'

interface Params {
  createUserUseCase: CreateCrudUseCase<
  CreateUserRequestDTO,
  ReadUserResponseDTO
  >
  modelMapper: UserModelMapper
}
export class CreateUserForOfficeUseCaseImpl
implements CreateUserForOfficeUseCase {
  private readonly createUserUseCase: CreateCrudUseCase<
  CreateUserRequestDTO,
  ReadUserResponseDTO
  >

  private readonly modelMapper: UserModelMapper

  constructor(params: Params) {
    this.createUserUseCase = params.createUserUseCase
    this.modelMapper = params.modelMapper
  }

  async create(
    request: CreateUserForOfficeRequestDTO
  ): Promise<CreateUserForOfficeResponseDTO> {
    const objectModel: CreateUserRequestDTO = this.modelMapper.fromCreateUserForOfficeRequestToCreateUserRequest(
      request
    )
    return this.createUserUseCase.create(objectModel)
  }
}
