import { ReadCrudUseCaseImpl } from '@/data'
import { AppError, ReadCrudRequestDTO } from '@/domain'
import { ReadManyCrudController } from '@/presentation'
import { ViewModelMapper } from '@/test/utilities/fakes'
import { sinon } from '@/test/utilities/tools'

describe('Presentation - Read Many Crud Controller', function() {
  const useCaseImpl = new ReadCrudUseCaseImpl<any, any>({
    repository: undefined,
    modelMapper: undefined,
    filterTransformer: undefined
  })
  const viewModelMapper = new ViewModelMapper()

  const controller = new ReadManyCrudController(useCaseImpl, viewModelMapper)

  const query = {
    id: '1'
  }

  const bodyResponse = [{
    foo: 'bar'
  }]

  const requestDTO: ReadCrudRequestDTO = {
    filters: [{
      equalTo: {
        id: query.id
      }
    }]
  }

  it('Should map request view model to dto, call use case, map response dto to view model and return response', async function() {
    // Arrange
    sinon.stub(viewModelMapper, 'fromReadRequestViewModelToReadRequestDTO').withArgs(query).returns(requestDTO)

    const result = {
      items: [bodyResponse]
    }

    sinon.stub(useCaseImpl, 'getMany').withArgs(requestDTO).resolves(result)
    sinon.stub(viewModelMapper, 'fromReadManyResponseDTOToReadResponseOneViewModel').withArgs(result.items).returns(result.items)

    // Act
    const response = await controller.handle(query)

    // Assert
    expect(response).toEqual({
      data: result,
      statusCode: 200
    })
  })

  it('Should handle error thrown by use case and return its message with status', async function() {
    // Arrange
    sinon.stub(viewModelMapper, 'fromReadRequestViewModelToReadRequestDTO').withArgs(query).returns(requestDTO)
    sinon.stub(useCaseImpl, 'getMany').withArgs(requestDTO).throws(new AppError({
      name: 'TestError',
      description: 'Error'
    }))

    // Act
    const response = await controller.handle(query)

    // Assert
    expect(response).toEqual({
      data: 'Error',
      statusCode: 500
    })
  })
})

afterEach(() => sinon.restore())
