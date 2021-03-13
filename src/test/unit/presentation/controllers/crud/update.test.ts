import { UpdateCrudUseCaseImpl } from '@/data'
import { AppError } from '@/domain'
import { UpdateCrudController } from '@/presentation'
import { ViewModelMapper } from '@/test/utilities/fakes'
import { sinon } from '@/test/utilities/tools'

describe('Presentation - Update Crud Controller', function() {
  const useCaseImpl = new UpdateCrudUseCaseImpl<any, any>({
    repository: undefined,
    modelMapper: undefined,
    afterUpdateCrudUseCase: undefined
  })
  const viewModelMapper = new ViewModelMapper()

  const controller = new UpdateCrudController(useCaseImpl, viewModelMapper)

  const bodyRequest = {
    foo: 'bar'
  }

  const bodyResponse = {
    ...bodyRequest,
    bar: 'foo'
  }

  it('Should map request view model to dto, call use case, map response dto to view model and return response', async function() {
    // Arrange
    sinon.stub(viewModelMapper, 'fromUpdateRequestViewModelToUpdateRequestDTO').withArgs(bodyRequest).returns(bodyRequest)
    sinon.stub(useCaseImpl, 'update').withArgs(bodyRequest).resolves(bodyResponse)
    sinon.stub(viewModelMapper, 'fromUpdateResponseDTOToUpdateResponseViewModel').withArgs(bodyResponse).returns(bodyResponse)

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

  it('Should handle error thrown by use case and return its message with status', async function() {
    // Arrange
    sinon.stub(viewModelMapper, 'fromUpdateRequestViewModelToUpdateRequestDTO').withArgs(bodyRequest).returns(bodyRequest)
    sinon.stub(useCaseImpl, 'update').withArgs(bodyRequest).throws(new AppError({
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
