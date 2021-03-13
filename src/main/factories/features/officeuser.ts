import {
  CreateOfficeRequestDTO,
  CreateUserForOfficeUseCase,
  ReadOfficeResponseDTO,
  ReadUserResponseDTO,
  ReadOfficeUseCase,
  ReadCrudUseCase,
  UpdateOfficeRequestDTO,
  CreateUserRequestDTO,
  UpdateUserRequestDTO,
  CreateCrudUseCase,
  ReadUserUseCase,
} from '@/domain'
import {
  OfficeModelMapper,
  CreateOfficeUseCaseImpl,
  CreateUserForOfficeUseCaseImpl,
  CreateUserUseCaseImpl,
  LogInUseCaseImpl,
  UserModelMapper,
} from '@/data'
import { OfficeViewModelMapper, UserViewModelMapper } from '@/presentation'

import { stringUtilities } from '@/main/factories/utilities'
import { CrudFactory } from './crud'
import { UserRepositoryImpl } from '@/infra'
import { UserControllerFacade } from '@/presentation/features/user/user-facade'
import { LoginController } from '@/presentation/features/user/login-controller'
import { RequestParamsWithUser } from '../request-params'
import { ReadOfficeUseCaseImpl } from '@/data/features/office/read/use-case'
import { ReadUserUseCaseImpl } from '@/data/features/user/read/use-case'
import { InfraFactory } from '../infra/infra'

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

  private readonly readUserUseCase: ReadUserUseCase
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
      uniqueConstraintError:
        'Já existe um usuário cadastrado com esse username ou email',
      isPublicTable: true,
    })
    this.userRepository = new UserRepositoryImpl({
      readUserCrudRepository: this.userCrudFactory.getReadRepository(),
      updateUserCrudRepository: this.userCrudFactory.getUpdateRepository(),
      authentication: InfraFactory.getAuthentication(),
      stringUtilities
    })
    this.readUserUseCase = new ReadUserUseCaseImpl({
      readCrudUseCase: this.userCrudFactory.getReadUseCase(),
    })
    this.userCrudFactory.setAfterCreateCrudUseCase(this.readUserUseCase)
    this.userCrudFactory.setAfterUpdateCrudUseCase(this.readUserUseCase)
    this.createUserUseCase = new CreateUserUseCaseImpl({
      repository: this.userCrudFactory.getCreateRepository(),
      afterCreateUseCase: this.readUserUseCase,
      modelMapper: this.modelMapper,
      authentication: InfraFactory.getAuthentication(),
    })
    this.userCrudFactory.setCreateCrudUseCase(this.createUserUseCase)
  }

  getControllerFacade(): any {
    const logInUseCase = new LogInUseCaseImpl({
      repository: this.userRepository,
      readOfficeUseCase: this.officeFactory.getReadOfficeUseCase(),
    })

    const logInController = new LoginController(logInUseCase)

    const userCrudControllerFacade = this.userCrudFactory.getControllerFacade()

    return new UserControllerFacade(userCrudControllerFacade, logInController)
  }

  getCreateUserForOfficeUseCase(): CreateUserForOfficeUseCase {
    return new CreateUserForOfficeUseCaseImpl({
      createUserUseCase: this.userCrudFactory.getCreateUseCase(),
      modelMapper: this.modelMapper,
    })
  }
}
