import { CreateCrudUseCaseImpl } from '@/data'
import { AppError } from '@/domain'
import { CreateCrudController } from '@/presentation'
import { ViewModelMapper } from '@/test/utilities/fakes'
import { sinon } from '@/test/utilities/tools'

describe('Presentation - Create Crud Controller', function() {
  const createCrudUseCaseImpl = new CreateCrudUseCaseImpl({
    repository: undefined,
    modelMapper: undefined,
    afterCreateUseCase: undefined
  })
  const viewModelMapper = new ViewModelMapper()

  const controller = new CreateCrudController(createCrudUseCaseImpl, viewModelMapper)

  const bodyRequest = {
    foo: 'bar'
  }

  const bodyResponse = {
    ...bodyRequest,
    bar: 'foo'
  }

  it('Should map request view model to dto, call create use case, map response dto to view model and return response', async function() {
    // Arrange
    sinon.stub(viewModelMapper, 'fromCreateRequestViewModelToCreateRequestDTO').withArgs(bodyRequest).returns(bodyRequest)
    sinon.stub(createCrudUseCaseImpl, 'create').withArgs(bodyRequest).resolves(bodyResponse)
    sinon.stub(viewModelMapper, 'fromCreateResponseDTOToCreateResponseViewModel').withArgs(bodyResponse).returns(bodyResponse)

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
    sinon.stub(viewModelMapper, 'fromCreateRequestViewModelToCreateRequestDTO').withArgs(bodyRequest).returns(bodyRequest)
    sinon.stub(createCrudUseCaseImpl, 'create').withArgs(bodyRequest).throws(new AppError({
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
