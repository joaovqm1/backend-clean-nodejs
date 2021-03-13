import { DeleteCrudRepository } from '@/data/features/crud/delete/repository'
import {
  CreateUserForOfficeUseCase,
  CreateUserForOfficeRequestDTO,
  CreateUserForOfficeResponseDTO,
  OfficeEntity,
} from '@/domain/features/office'
import { CreateCrudRepository } from '@/data/features/crud'
import { AfterCreateCrudUseCase, CreateCrudUseCase } from '@/domain/features'
import { OfficeModelMapper } from '../mapper'
import {
  CreateOfficeRequestDTO,
  CreateOfficeResponseDTO,
} from '@/domain/features/'
import { OfficeModel } from '../model'

interface Params {
  createRepository: CreateCrudRepository
  deleteRepository: DeleteCrudRepository
  modelMapper: OfficeModelMapper
  createUserForOfficeUseCase: CreateUserForOfficeUseCase
  afterCreateUseCase: AfterCreateCrudUseCase<OfficeEntity>
}

export class CreateOfficeUseCaseImpl
implements
  CreateCrudUseCase<CreateOfficeRequestDTO, CreateOfficeResponseDTO> {
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
    const objectModel: any = this.modelMapper.fromCreateRequestDTOToModel(
      request
    )

    const newOffice: OfficeModel = await this.createRepository.create(
      objectModel
    )

    try {
      const fetchedOffice: OfficeEntity = await this.afterCreateUseCase.fetchAfterCreation(
        newOffice.id
      )

      return {
        ...fetchedOffice,
        user: await this.createUserForOffice(request, newOffice),
      }
    } catch (error) {
      await this.deleteRepository.delete(newOffice.id)
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
      name: request.owner || request.name,
    }

    return await this.createUserUseCase.create(newUser)
  }
}
