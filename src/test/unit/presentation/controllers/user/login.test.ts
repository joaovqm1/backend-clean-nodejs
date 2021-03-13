import { LogInUseCaseImpl } from '@/data'
import { AppError, LogInRequestDTO, LogInResponseDTO } from '@/domain'
import { LoginController } from '@/presentation/features/user/login-controller'
import { officeEntity, userEntity } from '@/test/utilities/mocks'
import { sinon } from '@/test/utilities/tools'

describe('Presentation - LogIn Controller', function() {
  const useCaseImpl = new LogInUseCaseImpl({
    repository: undefined,
    readOfficeUseCase: undefined
  })

  const controller = new LoginController(useCaseImpl)

  const bodyRequest: LogInRequestDTO = {
    usernameOrEmail: 'username',
    password: 'password'
  }

  const bodyResponse: LogInResponseDTO = {
    ...userEntity,
    office: officeEntity
  }

  it('Should call create use case and return response', async function() {
    // Arrange
    sinon.stub(useCaseImpl, 'logIn').withArgs(bodyRequest).resolves(bodyResponse)

    // Act
    const response = await controller.handle(bodyRequest)

    // Assert
    expect(response).toEqual({
      data: {
        ...bodyResponse
      },
      statusCode: 200
    })
  })

  it('Should handle error thrown by create use case and return its message with status', async function() {
    // Arrange
    sinon.stub(useCaseImpl, 'logIn').withArgs(bodyRequest).throws(new AppError({
      name: 'TestError',
      description: 'Error'
    }))

    // Act
    const response = await controller.handle(bodyRequest)

    // Assert
    expect(response).toEqual({
      data: 'Error',
      statusCode: 500
    })
  })
})

afterEach(() => sinon.restore())
