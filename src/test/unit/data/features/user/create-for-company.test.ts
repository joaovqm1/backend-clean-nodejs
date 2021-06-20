import sinon from 'sinon'

import { AfterCreateCrudUseCase, CreateUserForOfficeRequestDTO, CreateUserRequestDTO, CreateUserResponseDTO } from '@/domain'
import {
  UserModelMapper,
  CreateUserForOfficeUseCaseImpl,
  CreateCrudUseCaseImpl,
  UserModel
} from '@/data/features'
import { CreateCrudRepositoryImpl } from '@/infra'
import { mockUserEntity } from '@/test/utilities/mocks'

describe('Data - Create User for Office Use Case', function() {
  const userMapper = new UserModelMapper(undefined)
  const mockAfterCreate: AfterCreateCrudUseCase<any> = {
    fetchAfterCreation: jest.fn()
  }
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
      role: { id: 2 }
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
      role: { id: 2 },
      name: 'user',
      email: 'user@email.com',
      username: 'dev',
      roleId: 2
    }

    sinon.stub(userMapper, 'fromCreateUserForOfficeRequestToCreateUserRequest')
      .withArgs(request)
      .returns(createUserRequest)

    sinon.stub(userMapper, 'fromCreateRequestDTOToModel')
      .withArgs(createUserRequest)
      .returns(objectModel)

    sinon.stub(createRepository, 'create')
      .withArgs(objectModel)
      .resolves(mockUserEntity)

    sinon.stub(mockAfterCreate, 'fetchAfterCreation')
      .withArgs(mockUserEntity.id)
      .resolves(mockUserEntity)

    sinon.stub(createCrudUseCase, 'create')
      .withArgs(createUserRequest)
      .resolves(mockUserEntity)

    expect(await createUserForOfficeUseCase.create(request)).toEqual(mockUserEntity)
  })
})

afterEach(() => sinon.restore())
