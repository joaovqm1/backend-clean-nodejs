import faker from 'faker'
import sinon from 'sinon'


import { AfterCreateCrudUseCase, CreateUserRequestDTO, ReadUserResponseDTO } from '@/domain'
import {
  UserModelMapper,
  CreateUserUseCaseImpl,
  UserModel
} from '@/data'
import {
  CreateCrudRepositoryImpl,
  AuthenticationImpl
} from '@/infra'
import { mockEmailSender } from '@/test/unit/third-party/mocks'
import { mockHtmlMounter } from '@/test/unit/utilities/mocks'
import { mockUserEntity } from '@/test/utilities/mocks'

describe('Data - Create User Use Case', function() {
  const userMapper = new UserModelMapper(undefined)
  const createRepository = new CreateCrudRepositoryImpl(undefined)
  const mockAfterCreate: AfterCreateCrudUseCase<any> = {
    fetchAfterCreation: jest.fn()
  }
  const authenticationImpl = new AuthenticationImpl()

  const createUserUseCase = new CreateUserUseCaseImpl({
    repository: createRepository,
    afterCreateUseCase: mockAfterCreate,
    modelMapper: userMapper,
    authentication: authenticationImpl,
    emailSender: mockEmailSender,
    htmlMounter: mockHtmlMounter
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

    sinon.stub(mockAfterCreate, 'fetchAfterCreation')
      .withArgs(model.id)
      .resolves(fetchedUser)

    const sendWelcomeEmailSpy = sinon.stub(createUserUseCase, 'sendWelcomeEmail')

    expect(await createUserUseCase.create(request)).toEqual(fetchedUser)
    expect(sendWelcomeEmailSpy.getCall(0).args[0]).toEqual(fetchedUser)
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

  it('Should send welcome email to user', async function() {
    // Arrange
    const mockEmailId = faker.datatype.uuid()

    sinon.stub(mockHtmlMounter, 'mount').withArgs('welcome').returns('|username|')
    sinon.stub(mockEmailSender, 'send').withArgs({
      toAddress: mockUserEntity.email,
      subject: 'Bem vindo(a) ao Projetei',
      html: mockUserEntity.name
    }).resolves(mockEmailId)

    // Act
    const receivedResponse = await createUserUseCase.sendWelcomeEmail(mockUserEntity)

    // Assert
    const expectedResponse = mockEmailId
    expect(receivedResponse).toEqual(expectedResponse)
  })
})

afterEach(() => sinon.restore())
