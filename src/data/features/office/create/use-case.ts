import { CreateCrudRepository } from '@/data/features/crud'
import { DeleteCrudRepository } from '@/data/features/crud/delete/repository'
import { AfterCreateCrudUseCase, CreateCrudUseCase } from '@/domain/features'
import {
  CreateOfficeRequestDTO,
  CreateOfficeResponseDTO,
} from '@/domain/features/'
import {
  CreateUserForOfficeRequestDTO,
  CreateUserForOfficeResponseDTO,
  CreateUserForOfficeUseCase,
  OfficeEntity,
} from '@/domain/features/office'

import { OfficeModelMapper } from '../mapper'
import { OfficeModel } from '../model'

interface Params {
  createRepository: CreateCrudRepository
  deleteRepository: DeleteCrudRepository
  modelMapper: OfficeModelMapper
  createUserForOfficeUseCase: CreateUserForOfficeUseCase
  afterCreateUseCase: AfterCreateCrudUseCase<OfficeEntity>
}

export class CreateOfficeUseCaseImpl implements CreateCrudUseCase<CreateOfficeRequestDTO, CreateOfficeResponseDTO> {
  private readonly createRepository: CreateCrudRepository
  private readonly deleteRepository: DeleteCrudRepository
  private readonly modelMapper: OfficeModelMapper
  private readonly createUserUseCase: CreateUserForOfficeUseCase
  private readonly afterCreateUseCase: AfterCreateCrudUseCase<OfficeEntity>

  constructor(params: Params) {
    this.createRepository = params.createRepository
    this.deleteRepository = params.deleteRepository
    this.modelMapper = params.modelMapper
    this.createUserUseCase = params.createUserForOfficeUseCase
    this.afterCreateUseCase = params.afterCreateUseCase
  }

  async create(
    request: CreateOfficeRequestDTO
  ): Promise<CreateOfficeResponseDTO> {
    const model: any = this.modelMapper.fromCreateRequestDTOToModel(request)

    const createdOffice: OfficeModel = await this.createRepository.create(model)

    try {
      const fetchedOffice: OfficeEntity = await this.afterCreateUseCase.fetchAfterCreation(createdOffice.id)

      const user = await this.createUserForOffice(request, createdOffice)

      return {
        ...fetchedOffice,
        user
      }
    } catch (error) {
      await this.deleteRepository.delete(createdOffice.id)
      throw error
    }
  }

  async createUserForOffice(
    request: CreateOfficeRequestDTO,
    newOffice: OfficeModel
  ): Promise<CreateUserForOfficeResponseDTO> {
    const newUser: CreateUserForOfficeRequestDTO = {
      officeId: newOffice.id,
      email: request.email,
      cpf: request.cpf,
      username: request.user.username,
      password: request.user.password,
      name: request.owner,
    }

    return await this.createUserUseCase.create(newUser)
  }
}
