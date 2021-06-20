import sinon from 'sinon'

import { AfterCreateCrudUseCase, CreateUserRequestDTO, ReadUserResponseDTO } from '@/domain'
import {
  UserModelMapper,
  CreateCrudUseCaseImpl,
  UserModel
} from '@/data/features'
import { CreateCrudRepositoryImpl } from '@/infra'

describe('Data - Create CRUD Use Case', function() {
  const createRepository = new CreateCrudRepositoryImpl(undefined)
  const userMapper = new UserModelMapper(undefined)
  const mockAfterCreate: AfterCreateCrudUseCase<any> = {
    fetchAfterCreation: jest.fn()
  }

  const createCrudUseCase = new CreateCrudUseCaseImpl({
    repository: createRepository,
    modelMapper: userMapper,
    afterCreateUseCase: mockAfterCreate
  })

  it('Should return new object when passed a valid request to create it', async function() {
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

    const request: CreateUserRequestDTO = {
      name: 'user',
      email: 'user@email.com',
      cpf: '111111111111',
      username: 'dev',
      password: 'dev',
      role: { id: 9 }
    }

    const newUser: ReadUserResponseDTO = {
      id: objectModel.id,
      role: objectModel.role,
      ...objectModel
    }

    sinon.stub(userMapper, 'fromCreateRequestDTOToModel')
      .withArgs(request)
      .returns(objectModel)

    sinon.stub(createRepository, 'create')
      .withArgs(objectModel)
      .resolves(newUser)

    sinon.stub(mockAfterCreate, 'fetchAfterCreation')
      .withArgs(newUser.id)
      .resolves(newUser)

    expect(await createCrudUseCase.create(request)).toEqual(objectModel)
  })
})

afterEach(() => sinon.restore())
