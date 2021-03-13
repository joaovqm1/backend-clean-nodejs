import sinon from 'sinon'

import { CreateUserRequestDTO, ReadUserResponseDTO, UserEntity } from '@/domain'
import {
  UserModelMapper,
  ReadCrudUseCaseImpl,
  ReadUserUseCaseImpl,
  CreateUserUseCaseImpl,
  UserModel
} from '@/data'
import {
  CreateCrudRepositoryImpl,
  AuthenticationImpl
} from '@/infra'

describe('Data - Create User Use Case', function() {
  const userMapper = new UserModelMapper(undefined)
  const createRepository = new CreateCrudRepositoryImpl(undefined)
  const getUserCrudUseCase = new ReadCrudUseCaseImpl<UserEntity>({
    repository: undefined,
    filterTransformer: undefined,
    modelMapper: undefined
  })
  const readUserUseCase = new ReadUserUseCaseImpl({
    readCrudUseCase: getUserCrudUseCase
  })
  const authenticationImpl = new AuthenticationImpl()

  const createUserUseCase = new CreateUserUseCaseImpl({
    repository: createRepository,
    afterCreateUseCase: readUserUseCase,
    modelMapper: userMapper,
    authentication: authenticationImpl
  })

  it('Should return new user when passed a valid request to create it', async function() {
    const model: UserModel = {
      id: 1,
      token: 'token',
      officeId: 1,
      role: { id: 9 },
      cpf: '11111111111',
      name: 'user',
      email: 'user@email.com',
      username: 'dev',
      roleId: 9
    }

    const request: CreateUserRequestDTO = {
      name: 'user',
      email: 'user@email.com',
      username: 'dev',
      cpf: '11111111111',
      password: 'dev',
      role: { id: 9 }
    }

    sinon.stub(createUserUseCase, 'createModelAndSetPasswordHash').withArgs(request).resolves(model)

    sinon.stub(createRepository, 'create')
      .withArgs(model)
      .resolves(model)

    const fetchedUser: ReadUserResponseDTO = {
      id: model.id,
      role: model.role,
      ...model
    }

    sinon.stub(readUserUseCase, 'fetchAfterCreation')
      .withArgs(model.id)
      .resolves(fetchedUser)

    expect(await createUserUseCase.create(request)).toEqual(fetchedUser)
  })

  it('Should create model and set password hash', async function() {
    const model: UserModel = {
      id: 1,
      name: 'user',
      token: 'token',
      cpf: '11111111111',
      officeId: 1,
      email: 'user@email.com',
      username: 'dev',
      roleId: 9
    }
    const request: CreateUserRequestDTO = {
      name: 'user',
      email: 'user@email.com',
      username: 'dev',
      cpf: '11111111111',
      password: 'dev',
      role: { id: 9 }
    }

    sinon.stub(userMapper, 'fromCreateRequestDTOToModel')
      .withArgs(request)
      .returns(model)

    const passwordHash = 'passwordHash'

    sinon.stub(authenticationImpl, 'createPasswordHash')
      .withArgs(request.password)
      .resolves(passwordHash)

    expect(await createUserUseCase.createModelAndSetPasswordHash(request)).toEqual({
      ...model,
      passwordHash
    })
  })
})

afterEach(() => sinon.restore())
