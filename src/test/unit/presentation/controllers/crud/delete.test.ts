import { DeleteCrudUseCaseImpl } from '@/data'
import { AppError } from '@/domain'
import { DeleteCrudController } from '@/presentation'
import { sinon } from '@/test/utilities/tools'

describe('Presentation - Delete Crud Controller', function() {
  const useCaseImpl = new DeleteCrudUseCaseImpl({
    repository: undefined
  })

  const controller = new DeleteCrudController(useCaseImpl)

  const bodyRequest = {
    id: 1
  }

  const bodyResponse = 'Item removido com sucesso'

  it('Should call use case and return response', async function() {
    // Arrange
    sinon.stub(useCaseImpl, 'delete').withArgs(bodyRequest.id).resolves(bodyResponse)

    // Act
    const response = await controller.handle(bodyRequest)

    // Assert
    expect(response).toEqual({
      data: bodyResponse,
      statusCode: 200
    })
  })

  it('Should handle error thrown by use case and return its message with status', async function() {
    // Arrange
    sinon.stub(useCaseImpl, 'delete').withArgs(bodyRequest.id).throws(new AppError({
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
