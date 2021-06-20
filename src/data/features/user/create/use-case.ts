import { Authentication, EmailSender, HTMLMounter } from '@/data/contracts'
import { CreateCrudRepository } from '@/data/features/crud'
import {
  AfterCreateCrudUseCase,
  CreateCrudUseCase,
  CreateUserRequestDTO,
  CreateUserResponseDTO,
  UserEntity,
} from '@/domain'

import { UserModelMapper } from '../mapper'
import { UserModel } from '../model'

interface Params {
  repository: CreateCrudRepository
  afterCreateUseCase: AfterCreateCrudUseCase<UserEntity>
  modelMapper: UserModelMapper
  authentication: Authentication
  emailSender: EmailSender
  htmlMounter: HTMLMounter
}
export class CreateUserUseCaseImpl implements CreateCrudUseCase<CreateUserRequestDTO, CreateUserResponseDTO> {
  private readonly repository: CreateCrudRepository
  private readonly afterCreateUseCase: AfterCreateCrudUseCase<UserEntity>
  private readonly modelMapper: UserModelMapper
  private readonly authentication: Authentication
  private readonly emailSender: EmailSender
  private readonly htmlMounter: HTMLMounter

  constructor(params: Params) {
    this.repository = params.repository
    this.afterCreateUseCase = params.afterCreateUseCase
    this.modelMapper = params.modelMapper
    this.authentication = params.authentication
    this.emailSender = params.emailSender
    this.htmlMounter = params.htmlMounter
  }

  async create(request: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    const model = await this.createModelAndSetPasswordHash(request)

    const createdUser = await this.repository.create(model)

    const fetchedUser = await this.afterCreateUseCase.fetchAfterCreation(createdUser.id)

    await this.sendWelcomeEmail(fetchedUser)

    return fetchedUser
  }

  async createModelAndSetPasswordHash(
    request: CreateUserRequestDTO
  ): Promise<Omit<UserModel, 'id' | 'officeId' | 'token'>> {
    const userModel: Omit<UserModel, 'id' | 'officeId' | 'token'> =
      this.modelMapper.fromCreateRequestDTOToModel(request)

    userModel.passwordHash = await this.authentication.createPasswordHash(request.password)
    return userModel
  }

  async sendWelcomeEmail(user: Pick<CreateUserResponseDTO, 'email' | 'name'>): Promise<string> {
    let html = this.htmlMounter.mount('welcome')
    html = html.replace('|username|', user.name)

    return this.emailSender.send({
      toAddress: user.email,
      subject: 'Bem vindo(a) ao Projetei',
      html
    })
  }
}
