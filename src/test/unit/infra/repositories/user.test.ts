
import sinon from 'sinon'

import {
  ReadApiImpl,
  ReadCrudRepositoryImpl,
  ErrorHandlerImpl,
  UserRepositoryImpl,
  UpdateCrudRepositoryImpl,
  UpdateApiImpl,
  User,
  AuthenticationImpl
} from '@/infra'
import { stringUtilities } from '@/main/factories'
import { FilterBuilder, UserModel } from '@/data'
import { InvalidCredentialsError } from '@/domain'

describe('Infra - User Repository', () => {
  const errorHandler: ErrorHandlerImpl = new ErrorHandlerImpl('Error message')

  const readImpl: ReadApiImpl = new ReadApiImpl({
    sequelizeModel: undefined,
    queryCreater: undefined
  })
  const readRepository = new ReadCrudRepositoryImpl(readImpl)
  const updateApiImpl = new UpdateApiImpl({
    sequelizeModel: User,
    errorHandler: errorHandler
  })
  const updateRepository = new UpdateCrudRepositoryImpl(updateApiImpl, readImpl)
  const authenticationImpl = new AuthenticationImpl()
  const repository = new UserRepositoryImpl({
    readUserCrudRepository: readRepository,
    updateUserCrudRepository: updateRepository,
    authentication: authenticationImpl,
    stringUtilities
  })

  const user: UserModel = {
    id: 1,
    officeId: 1,
    token: 'token',
    cpf: '11111111111',
    roleId: 1,
    username: 'username',
    name: 'USER',
    email: 'test@test.com',
    passwordHash: 'passwordHash'
  }

  const token = 'token'

  const userWithToken = {
    ...user,
    token
  }

  it('Should validate user crendentials, create new token and return logged user when username is used', async function() {
    // Arrage
    sinon.stub(repository, 'getUserByEmailOrUsername').withArgs('username').resolves(user)
    sinon.stub(repository, 'createNewTokenForUser').withArgs(user).resolves(token)
    sinon.stub(authenticationImpl, 'comparePasswordAndHash').withArgs('password', user.passwordHash).resolves(true)

    // Act
    const loggedUser = await repository.logIn(user.username, 'password')

    // Assert
    expect(loggedUser).toEqual(userWithToken)
  })

  it('Should try to validate user crendentials and throw invalid credentials error if username or email doesn\'t match', async function() {
    // Arrage
    sinon.stub(repository, 'getUserByEmailOrUsername').withArgs('username').resolves(undefined)
    sinon.stub(authenticationImpl, 'comparePasswordAndHash').withArgs('password', undefined).resolves(false)

    // Act and Assert
    repository.logIn(user.username, 'password').catch(e => { expect(e).toEqual(new InvalidCredentialsError()) })
  })

  it('Should try to validate user crendentials and throw invalid credentials error if password doesn\'t match', async function() {
    // Arrage
    sinon.stub(repository, 'getUserByEmailOrUsername').withArgs('username').resolves(user)
    sinon.stub(authenticationImpl, 'comparePasswordAndHash').withArgs('password1', user.passwordHash).resolves(false)

    // Act and Assert
    repository.logIn(user.username, 'password1').catch(e => { expect(e).toEqual(new InvalidCredentialsError()) })
  })

  it('Should return the user found by username', async function() {
    // Arrange
    const filters = new FilterBuilder()
      .equalTo('username', user.passwordHash)
      .include(['role.id', 'role.name'])
      .build()

    sinon.stub(readRepository, 'getOne')
      .withArgs(filters)
      .resolves(user)

    // Act
    const foundUser = await repository.getUserByEmailOrUsername(user.passwordHash)

    // Assert
    expect(user).toEqual(foundUser)
  })

  it('Should return the user found by email', async function() {
    // Arrange
    const filters = new FilterBuilder()
      .equalTo('email', user.email)
      .include(['role.id', 'role.name'])
      .build()

    sinon.stub(readRepository, 'getOne')
      .withArgs(filters)
      .resolves(user)

    // Act
    const foundUser = await repository.getUserByEmailOrUsername(user.email)

    // Assert
    expect(user).toEqual(foundUser)
  })

  it('Should create new token to user and return it', async function() {
    // Arrange
    sinon.stub(stringUtilities, 'getRandomString').withArgs().returns(token)
    sinon.stub(updateRepository, 'update')
      .withArgs({ id: user.id, token })
      .resolves(userWithToken)

    // Act
    const expectedToken = await repository.createNewTokenForUser(user)

    // Assert
    expect(expectedToken).toBe(token)
  })
})

afterEach(() => {
  sinon.restore()
})
