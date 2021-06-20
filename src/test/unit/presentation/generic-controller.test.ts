import faker from 'faker'

import { GenericController } from '@/presentation/controller'

describe('Generic Controller', function() {
  const mockUseCase = {
    someFunction: jest.fn()
  }

  const mockMapRequest = jest.fn()
  const mockMapResponse = jest.fn()

  const controller = new GenericController({
    mapRequest: mockMapRequest,
    useCase: mockUseCase,
    mapResponse: mockMapResponse
  })

  const mockParams = faker.random.objectElement()
  mockMapRequest.mockReturnValue(mockParams)

  it('Should map request, call use case function, map response and return it', async function() {
    // Arrange
    const mockResponse = faker.random.objectElement()

    jest.spyOn(mockUseCase, 'someFunction').mockResolvedValue(mockResponse)
    mockMapResponse.mockReturnValue(mockResponse)

    // Act
    const receivedResponse = await controller.handle('someFunction', mockParams)

    // Assert
    expect(receivedResponse).toEqual({
      data: mockResponse,
      statusCode: 200
    })
    expect(mockMapRequest).toHaveBeenCalledWith(mockParams)
    expect(mockMapResponse).toHaveBeenCalledWith(mockResponse)
  })

  it('Should map request, call use case function, map response from a specific field and return it', async function() {
    // Arrange
    const controller = new GenericController({
      mapRequest: mockMapRequest,
      useCase: mockUseCase,
      mapResponse: mockMapResponse,
      responseFieldToMap: 'field'
    })

    const mockResponse = {
      field: faker.random.word()
    }

    jest.spyOn(mockUseCase, 'someFunction').mockResolvedValue(mockResponse)
    mockMapResponse.mockReturnValue(mockResponse.field)

    // Act
    const receivedResponse = await controller.handle('someFunction', mockParams)

    // Assert
    expect(receivedResponse).toEqual({
      data: mockResponse,
      statusCode: 200
    })
    expect(mockMapRequest).toHaveBeenCalledWith(mockParams)
    expect(mockMapResponse).toHaveBeenCalledWith(mockResponse.field)
  })

  it('Should handle error thrown by use case and return its message with status', async function() {
    // Arrange
    jest.spyOn(mockUseCase, 'someFunction').mockRejectedValue(new Error('TestError'))

    // Act
    const response = await controller.handle('someFunction', mockParams)

    // Assert
    expect(response).toEqual({
      data: 'Ocorreu um erro inesperado com sua requisição. Por favor, entre em contato com o suporte',
      statusCode: 500
    })
  })
})