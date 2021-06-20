import faker from 'faker'
import sinon from 'sinon'

import { Storage, SumCrudRepository, UploadFileUseCaseImpl } from '@/data'
import { documentUploadTreshold, UploadFileRequestDTO, UploadFileResonseDTO, UploadTresholdExceedError } from '@/domain'

describe('Upload file use case', function() {
  const mockStorage: Storage = {
    remove: jest.fn(),
    upload: jest.fn()
  }

  const mockOfficeId = faker.datatype.number()

  const mockSumRepository: SumCrudRepository = {
    sum: jest.fn()
  }

  const useCase = new UploadFileUseCaseImpl({
    storage: mockStorage,
    officeId: mockOfficeId,
    sumRepository: mockSumRepository
  })

  const mockRequest: UploadFileRequestDTO = {
    description: faker.random.word(),
    filename: faker.random.word(),
    originalname: faker.random.word(),
    path: faker.random.word(),
    mimetype: faker.random.word(),
    size: faker.datatype.number()
  }

  it('Should upload file and return response', async function() {
    // Arrange
    const mockExternalPath = faker.random.word()
    const mockExtension = faker.random.word()

    const validateIfDocumentSizeDoesntExceedMaximumSpy = sinon.stub(useCase, 'validateIfDocumentSizeDoesntExceedMaximum')

    sinon.stub(useCase, 'getUniqueFileKey').withArgs(mockRequest).returns(mockRequest.description)
    sinon.stub(useCase, 'getFileExtension').withArgs(mockRequest).returns(mockExtension)

    sinon.stub(mockStorage, 'upload').withArgs({ path: mockRequest.path, key: mockRequest.description }).resolves(mockExternalPath)

    // Act
    const receivedResponse = await useCase.upload(mockRequest)

    // Assert
    const expectedResponse: UploadFileResonseDTO = {
      key: mockRequest.description,
      mimeType: mockRequest.mimetype,
      size: mockRequest.size,
      description: mockRequest.description,
      extension: mockExtension,
      name: mockRequest.originalname,
      path: mockExternalPath
    }
    expect(receivedResponse).toEqual(expectedResponse)
    expect(validateIfDocumentSizeDoesntExceedMaximumSpy.getCall(0).args[0]).toEqual(mockRequest.size)
  })

  it('Should throw error if new size of documents exceed the treshold', async function() {
    // Arrange
    sinon.stub(mockSumRepository, 'sum')
      .withArgs({
        field: 'size'
      }).resolves(documentUploadTreshold)

    // Act
    // Assert
    await expect(async () => { await useCase.validateIfDocumentSizeDoesntExceedMaximum(0.001) })
      .rejects
      .toThrowError(new UploadTresholdExceedError().message)

  })

  it('Should not throw error if new size of documents does not exceed the treshold', async function() {
    // Arrange
    sinon.stub(mockSumRepository, 'sum')
      .withArgs({
        field: 'size'
      }).resolves(documentUploadTreshold - 1)

    // Act
    // Assert
    await useCase.validateIfDocumentSizeDoesntExceedMaximum(0.001)
  })

  it('Should create the file description', async function() {
    // Arrange
    const mockExtension = faker.random.word()
    sinon.stub(useCase, 'getFileExtension').withArgs(mockRequest).returns(mockExtension)
    sinon.stub(useCase, 'replaceWhiteSpaceFromDescription').withArgs(mockRequest.description).returns(mockRequest.description)

    // Act
    const receivedDescription = useCase.getUniqueFileKey(mockRequest)

    // Assert
    const expectedDescription = `office_${mockOfficeId}_${mockRequest.description}.${mockExtension}`
    expect(receivedDescription).toEqual(expectedDescription)
  })

  it('Should return the description with any whitespace', function() {
    // Arrange
    const mockDescription = 'My File Description is João'

    // Act
    const receivedDescription = useCase.replaceWhiteSpaceFromDescription(mockDescription)

    // Assert
    const expectedDescription = 'my_file_description_is_joão'
    expect(receivedDescription).toEqual(expectedDescription)
  })

  it('Should return the extension', async function() {
    // Arrange
    const mockExtension = faker.random.word()

    // Act
    const receivedExtension = useCase.getFileExtension({
      ...mockRequest,
      originalname: `${faker.random.word()}.${mockExtension}`
    })

    // Assert
    const expectedExtension = mockExtension
    expect(receivedExtension).toEqual(expectedExtension)
  })
})

afterEach(() => sinon.restore())