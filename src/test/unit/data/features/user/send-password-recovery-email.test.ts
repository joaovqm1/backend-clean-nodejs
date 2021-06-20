import faker from 'faker'
import sinon from 'sinon'

import { FilterBuilder, SendPasswordRecoveryEmailUseCaseImpl } from '@/data'
import { stringUtilities } from '@/main'
import { mockEmailSender } from '@/test/unit/third-party/mocks'
import { mockHtmlMounter } from '@/test/unit/utilities/mocks'
import { mockReadCrudUseCase, mockUpdateCrudUseCase } from '../../mocks'
import { PasswordRecoveryEmailNotFound, SendPasswordRecoveryEmailRequestDTO } from '@/domain'
import { mockUserEntity } from '@/test/utilities/mocks'

describe('Send Password Recovery Email Use Case', function() {
  const useCase = new SendPasswordRecoveryEmailUseCaseImpl({
    emailSender: mockEmailSender,
    htmlMounter: mockHtmlMounter,
    readUserUseCase: mockReadCrudUseCase,
    stringUtilities,
    updateUserUseCase: mockUpdateCrudUseCase
  })

  const mockRequest: SendPasswordRecoveryEmailRequestDTO = {
    email: faker.internet.email()
  }

  it('Should get user by passed email and send email request', async function() {
    // Arrange
    sinon.stub(useCase, 'getUserByEmail').withArgs(mockRequest.email).resolves(mockUserEntity)

    const mockToken = faker.datatype.uuid()

    sinon.stub(stringUtilities, 'getRandomString').withArgs(6).returns(mockToken)

    const sendEmailStub = sinon.stub(useCase, 'sendEmail')

    sinon.stub(mockUpdateCrudUseCase, 'update')
      .withArgs({ id: mockUserEntity.id, recoveryToken: mockToken })
      .resolves(mockUserEntity)

    // Act
    const receivedResponse = await useCase.send(mockRequest)

    // Assert
    const expectedResponse = 'Email enviado com sucesso'
    expect(receivedResponse).toEqual(expectedResponse)
    expect(sendEmailStub.getCall(0).args[0]).toEqual(mockUserEntity)
  })

  it('Should return the user found by email', async function() {
    // Arrange
    const filters = new FilterBuilder()
      .equalTo('email', mockRequest.email)
      .select(['id'])
      .build()

    sinon.stub(mockReadCrudUseCase, 'getOne').withArgs(filters).resolves(mockUserEntity)

    // Act
    const receivedUser = await useCase.getUserByEmail(mockRequest.email)

    // Assert
    const expectedUser = mockUserEntity
    expect(receivedUser).toEqual(expectedUser)
  })

  it('Should throw error if user not found by email', async function() {
    // Arrange
    const filters = new FilterBuilder()
      .equalTo('email', mockRequest.email)
      .select(['id'])
      .build()

    sinon.stub(mockReadCrudUseCase, 'getOne').withArgs(filters).resolves(undefined)

    // Act
    expect(async () => { await useCase.getUserByEmail(mockRequest.email) })
      .rejects
      .toThrow(PasswordRecoveryEmailNotFound)
  })

  it('Should send recovery password email to user', async function() {
    // Arrange
    const mockEmailId = faker.datatype.uuid()

    sinon.stub(mockHtmlMounter, 'mount').withArgs('password-recovery')
      .returns('|username| |recover-password-token|')
    sinon.stub(mockEmailSender, 'send').withArgs({
      toAddress: mockUserEntity.email,
      subject: 'Recupere sua senha do Projetei',
      html: `${mockUserEntity.name} ${mockUserEntity.recoveryToken}`
    }).resolves(mockEmailId)

    // Act
    const receivedResponse = await useCase.sendEmail(mockUserEntity)

    // Assert
    const expectedResponse = mockEmailId
    expect(receivedResponse).toEqual(expectedResponse)
  })
})

afterEach(() => sinon.restore())