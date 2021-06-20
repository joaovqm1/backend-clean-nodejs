import faker from 'faker'
import sinon from 'sinon'

import { Authentication, ChangePasswordUseCaseImpl, FilterBuilder } from '@/data'
import { mockReadCrudUseCase, mockUpdateCrudUseCase } from '../../mocks'
import { ChangePasswordRequestDTO, InvalidPasswordRecoveryToken } from '@/domain'
import { mockUserEntity } from '@/test/utilities/mocks'

describe('Change Password Use Case', function() {
  const mockAuthentication: Authentication = {
    comparePasswordAndHash: jest.fn(),
    createPasswordHash: jest.fn()
  }

  const useCase = new ChangePasswordUseCaseImpl({
    readUserUseCase: mockReadCrudUseCase,
    updateUserUseCase: mockUpdateCrudUseCase,
    authentication: mockAuthentication
  })

  const mockRequest: ChangePasswordRequestDTO = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    token: faker.datatype.uuid()
  }

  it('Should get user by passed email and update the password', async function() {
    // Arrange
    sinon.stub(useCase, 'getUserByEmail').withArgs(mockRequest.email).resolves({
      ...mockUserEntity,
      recoveryToken: mockRequest.token
    })

    const mockPasswordHash = faker.datatype.uuid()

    sinon.stub(mockAuthentication, 'createPasswordHash')
      .withArgs(mockRequest.password)
      .resolves(mockPasswordHash)

    const updateSpy = sinon.stub(mockUpdateCrudUseCase, 'update')

    // Act
    const receivedResponse = await useCase.change(mockRequest)

    // Assert
    const expectedResponse = 'Senha atualizada com sucesso'
    expect(receivedResponse).toEqual(expectedResponse)
    expect(updateSpy.getCall(0).args[0]).toEqual({
      id: mockUserEntity.id,
      recoveryToken: null,
      passwordHash: mockPasswordHash
    })
  })

  it('Should throw an error when tokens are different', async function() {
    // Arrange
    sinon.stub(useCase, 'getUserByEmail').withArgs(mockRequest.email).resolves({
      ...mockUserEntity,
      recoveryToken: undefined
    })

    // Act
    expect(async () => { await useCase.change(mockRequest) })
      .rejects
      .toThrow(InvalidPasswordRecoveryToken)
  })

  it('Should return the user found by email', async function() {
    // Arrange
    const filters = new FilterBuilder()
      .equalTo('email', mockRequest.email)
      .select(['id', 'recoveryToken'])
      .build()

    sinon.stub(mockReadCrudUseCase, 'getOne').withArgs(filters).resolves(mockUserEntity)

    // Act
    const receivedUser = await useCase.getUserByEmail(mockRequest.email)

    // Assert
    const expectedUser = mockUserEntity
    expect(receivedUser).toEqual(expectedUser)
  })
})

afterEach(() => sinon.restore())