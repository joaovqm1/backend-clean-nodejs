import sinon from 'sinon'

import { LogInRequestDTO } from '@/domain'
import {
  LogInUseCaseImpl,
  ReadOfficeUseCaseImpl,
  UserModel
} from '@/data/features'
import { UserRepositoryImpl } from '@/infra'
import { officeEntity } from '@/test/utilities/mocks'

afterEach(function() {
  sinon.restore()
})

describe('Data - User Login Use Case', function() {
  const readOfficeUseCase = new ReadOfficeUseCaseImpl({
    readCrudUseCase: undefined,
    userIdentification: undefined
  })

  const userRepository = new UserRepositoryImpl({
    readUserCrudRepository: undefined,
    stringUtilities: undefined,
    authentication: undefined,
    updateUserCrudRepository: undefined
  })

  const loginUseCase = new LogInUseCaseImpl({
    repository: userRepository,
    readOfficeUseCase: readOfficeUseCase
  })

  it('Should return a user with your office when request login', async function() {
    // Arrange
    const request: LogInRequestDTO = {
      usernameOrEmail: 'user',
      password: 'user'
    }

    const userModel: UserModel = {
      id: 1,
      role: { id: 9 },
      name: 'user',
      email: 'user@email.com',
      username: 'dev',
      cpf: '11111111111',
      roleId: 9,
      token: 'token',
      officeId: 1
    }

    const loggedUser = {
      ...userModel,
      office: officeEntity
    }

    sinon.stub(userRepository, 'logIn')
      .withArgs(request.usernameOrEmail, request.password)
      .resolves(userModel)

    sinon.stub(readOfficeUseCase, 'getOfficeForLoggedUser')
      .withArgs(loggedUser.officeId)
      .resolves(officeEntity)

    // Act and assert
    expect(await loginUseCase.logIn(request)).toEqual(loggedUser)
  })
})

afterEach(() => sinon.restore())
