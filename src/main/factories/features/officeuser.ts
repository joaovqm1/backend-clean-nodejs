import {
  ChangePasswordUseCaseImpl,
  CreateOfficeUseCaseImpl,
  CreateUserForOfficeUseCaseImpl,
  CreateUserUseCaseImpl,
  LogInUseCaseImpl,
  OfficeModelMapper,
  ReadOfficeUseCaseImpl,
  SendPasswordRecoveryEmailUseCaseImpl,
  UserModelMapper
} from '@/data'
import {
  ChangePasswordUseCase,
  CreateCrudUseCase,
  CreateOfficeRequestDTO,
  CreateUserForOfficeUseCase,
  CreateUserRequestDTO,
  ReadCrudUseCase,
  ReadOfficeResponseDTO,
  ReadOfficeUseCase,
  ReadUserResponseDTO,
  SendPasswordRecoveryEmailUseCase,
  UpdateOfficeRequestDTO,
  UpdateUserRequestDTO,
  userFieldsToInclude,
} from '@/domain'
import { UserRepositoryImpl } from '@/infra'
import { htmlMounter, stringUtilities } from '@/main/factories/utilities'
import { GenericController, OfficeViewModelMapper, UserViewModelMapper } from '@/presentation'

import { InfraFactory } from '../infra/infra'
import { RequestParamsWithUser } from '../request-params'
import { getEmailSender } from '../third-party'
import { CrudFactory } from './crud'

export class OfficeFactory {
  private readonly officeCrudFactory: CrudFactory<CreateOfficeRequestDTO, ReadOfficeResponseDTO, ReadOfficeResponseDTO, UpdateOfficeRequestDTO>

  private readonly readUseCase: ReadOfficeUseCase
  constructor(requestParams: RequestParamsWithUser) {
    this.officeCrudFactory = new CrudFactory<CreateOfficeRequestDTO, ReadOfficeResponseDTO, ReadOfficeResponseDTO, UpdateOfficeRequestDTO>({
      requestParams,
      entityName: 'office',
      modelMapper: new OfficeModelMapper(),
      viewModelMapper: new OfficeViewModelMapper(stringUtilities),
      uniqueConstraintError:
        'Já existe uma conta cadastrada com esse nome e cnpj',
      isPublicTable: true,
      officeIdFieldToQuery: 'id',
    })
    this.readUseCase = new ReadOfficeUseCaseImpl({
      readCrudUseCase: this.officeCrudFactory.getReadUseCase(),
      userIdentification: requestParams,
    })
    this.officeCrudFactory.setAfterCreateCrudUseCase(this.readUseCase)
    this.officeCrudFactory.setAfterUpdateCrudUseCase(this.readUseCase)
    this.officeCrudFactory.setReadCrudUseCase(this.readUseCase)
  }

  getControllerFacade(userFactory: UserFactory): any {
    const createUseCase = new CreateOfficeUseCaseImpl({
      createRepository: this.officeCrudFactory.getCreateRepository(),
      deleteRepository: this.officeCrudFactory.getDeleteRepository(),
      modelMapper: new OfficeModelMapper(),
      createUserForOfficeUseCase: userFactory.getCreateUserForOfficeUseCase(),
      afterCreateUseCase: this.readUseCase,
    })

    this.officeCrudFactory.setCreateCrudUseCase(createUseCase)

    return this.officeCrudFactory.getControllerFacade()
  }

  getReadUseCase(): ReadCrudUseCase<ReadOfficeResponseDTO> {
    return this.officeCrudFactory.getReadUseCase()
  }

  getReadOfficeUseCase(): ReadOfficeUseCase {
    return this.readUseCase
  }
}

export class UserFactory {
  private readonly userCrudFactory: CrudFactory<CreateUserRequestDTO, ReadUserResponseDTO, ReadUserResponseDTO, UpdateUserRequestDTO>

  private readonly userRepository: UserRepositoryImpl
  private readonly createUserUseCase: CreateCrudUseCase<CreateUserRequestDTO, ReadUserResponseDTO>

  private readonly modelMapper: UserModelMapper

  // eslint-disable-next-line max-lines-per-function
  constructor(
    readonly requestParams: RequestParamsWithUser,
    private readonly officeFactory: OfficeFactory
  ) {
    this.modelMapper = new UserModelMapper(stringUtilities)
    this.userCrudFactory = new CrudFactory<CreateUserRequestDTO, ReadUserResponseDTO, ReadUserResponseDTO, UpdateUserRequestDTO>({
      requestParams,
      entityName: 'user',
      modelMapper: this.modelMapper,
      viewModelMapper: new UserViewModelMapper(stringUtilities),
      uniqueConstraintError: 'Já existe um usuário cadastrado com esse username ou email',
      isPublicTable: true,
      fieldsToIncludeOnQuery: userFieldsToInclude
    })
    this.userRepository = new UserRepositoryImpl({
      readUserCrudRepository: this.userCrudFactory.getReadRepository(),
      updateUserCrudRepository: this.userCrudFactory.getUpdateRepository(),
      authentication: InfraFactory.getAuthentication(),
      stringUtilities
    })
    this.createUserUseCase = new CreateUserUseCaseImpl({
      repository: this.userCrudFactory.getCreateRepository(),
      afterCreateUseCase: this.userCrudFactory.getAfterCreateUseCase(),
      modelMapper: this.modelMapper,
      authentication: InfraFactory.getAuthentication(),
      htmlMounter,
      emailSender: getEmailSender()
    })
    this.userCrudFactory.setCreateCrudUseCase(this.createUserUseCase)
  }

  getControllerFacade(): any {
    const logInUseCase = new LogInUseCaseImpl({
      repository: this.userRepository,
      readOfficeUseCase: this.officeFactory.getReadOfficeUseCase(),
    })

    const logInController = new GenericController({ useCase: logInUseCase })

    return {
      ...this.userCrudFactory.getControllerFacade(),
      logIn: logInController,
      sendPasswordRecoveryEmail: new GenericController({
        useCase: this.getSendPasswordRecoveryEmailUseCase()
      }),
      changePassword: new GenericController({
        useCase: this.getChangePasswordUseCase()
      })
    }
  }

  getCreateUserForOfficeUseCase(): CreateUserForOfficeUseCase {
    return new CreateUserForOfficeUseCaseImpl({
      createUserUseCase: this.userCrudFactory.getCreateUseCase(),
      modelMapper: this.modelMapper,
    })
  }

  getSendPasswordRecoveryEmailUseCase(): SendPasswordRecoveryEmailUseCase {
    return new SendPasswordRecoveryEmailUseCaseImpl({
      emailSender: getEmailSender(),
      htmlMounter,
      readUserUseCase: this.userCrudFactory.getReadUseCase(),
      updateUserUseCase: this.userCrudFactory.getUpdateUseCase(),
      stringUtilities
    })
  }

  getChangePasswordUseCase(): ChangePasswordUseCase {
    return new ChangePasswordUseCaseImpl({
      readUserUseCase: this.userCrudFactory.getReadUseCase(),
      updateUserUseCase: this.userCrudFactory.getUpdateUseCase(),
      authentication: InfraFactory.getAuthentication()
    })
  }
}
