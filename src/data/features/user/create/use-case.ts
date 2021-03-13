import { CreateCrudRepository } from '@/data/features/crud'
import {
  AfterCreateCrudUseCase,
  CreateCrudUseCase,
  UserEntity,
  CreateUserRequestDTO,
  CreateUserResponseDTO,
} from '@/domain'
import { UserModelMapper } from '../mapper'
import { UserModel } from '../model'
import { Authentication } from '@/data/contracts'

interface Params {
  repository: CreateCrudRepository
  afterCreateUseCase: AfterCreateCrudUseCase<UserEntity>
  modelMapper: UserModelMapper
  authentication: Authentication
}
export class CreateUserUseCaseImpl
implements CreateCrudUseCase<CreateUserRequestDTO, CreateUserResponseDTO> {
  private readonly repository: CreateCrudRepository
  private readonly afterCreateUseCase: AfterCreateCrudUseCase<UserEntity>
  private readonly modelMapper: UserModelMapper
  private readonly authentication: Authentication

  constructor(params: Params) {
    this.repository = params.repository
    this.afterCreateUseCase = params.afterCreateUseCase
    this.modelMapper = params.modelMapper
    this.authentication = params.authentication
  }

  async create(request: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    const model = await this.createModelAndSetPasswordHash(request)

    const newUser = await this.repository.create(model)

    return this.afterCreateUseCase.fetchAfterCreation(newUser.id)
  }

  async createModelAndSetPasswordHash(
    request: CreateUserRequestDTO
  ): Promise<Omit<UserModel, 'id' | 'officeId' | 'token'>> {
    const userModel: Omit<
    UserModel,
    'id' | 'officeId' | 'token'
    > = this.modelMapper.fromCreateRequestDTOToModel(request)
    userModel.passwordHash = await this.authentication.createPasswordHash(
      request.password
    )

    return userModel
  }
}
