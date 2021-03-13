import sinon from 'sinon'

import { CreateUserForOfficeRequestDTO, CreateUserRequestDTO, CreateUserResponseDTO } from '@/domain'
import {
  UserModelMapper,
  ReadUserUseCaseImpl,
  CreateUserForOfficeUseCaseImpl,
  CreateCrudUseCaseImpl,
  UserModel
} from '@/data/features'
import { CreateCrudRepositoryImpl } from '@/infra'
import { userEntity } from '@/test/utilities/mocks'

describe('Data - Create User for Office Use Case', function() {
  const userMapper = new UserModelMapper(undefined)
  const readUserUseCase = new ReadUserUseCaseImpl({
    readCrudUseCase: undefined
  })
  const createRepository = new CreateCrudRepositoryImpl({
    create: undefined
  })
  const createCrudUseCase = new CreateCrudUseCaseImpl<CreateUserRequestDTO, CreateUserResponseDTO>({
    repository: undefined,
    afterCreateUseCase: undefined,
    modelMapper: undefined
  })

  const createUserForOfficeUseCase = new CreateUserForOfficeUseCaseImpl({
    createUserUseCase: createCrudUseCase,
    modelMapper: userMapper
  })

  it('Should return new user for office when passed a valid request to create it', async function() {
    const createUserRequest: CreateUserRequestDTO = {
      name: 'user',
      cpf: '11111111111',
      email: 'user@email.com',
      username: 'dev',
      password: 'dev',
      role: { id: 9 }
    }
    const request: CreateUserForOfficeRequestDTO = {
      officeId: 1,
      name: 'office',
      cpf: '11111111111',
      email: 'office@email.com',
      username: 'office',
      password: 'office'
    }
    const objectModel: UserModel = {
      id: 1,
      token: 'token',
      officeId: 1,
      cpf: '11111111111',
      role: { id: 9 },
      name: 'user',
      email: 'user@email.com',
      username: 'dev',
      roleId: 9
    }

    sinon.stub(userMapper, 'fromCreateUserForOfficeRequestToCreateUserRequest')
      .withArgs(request)
      .returns(createUserRequest)

    sinon.stub(userMapper, 'fromCreateRequestDTOToModel')
      .withArgs(createUserRequest)
      .returns(objectModel)

    sinon.stub(createRepository, 'create')
      .withArgs(objectModel)
      .resolves(userEntity)

    sinon.stub(readUserUseCase, 'fetchAfterCreation')
      .withArgs(userEntity.id)
      .resolves(userEntity)

    sinon.stub(createCrudUseCase, 'create')
      .withArgs(createUserRequest)
      .resolves(userEntity)

    expect(await createUserForOfficeUseCase.create(request)).toEqual(userEntity)
  })
})

afterEach(() => sinon.restore())
