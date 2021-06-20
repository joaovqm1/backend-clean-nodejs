import sinon from 'sinon'

import { CreateDocumentUseCaseImpl } from '@/data'
import {
  mockCreateCrudUseCase,
  mockUploadFileRequestDTO,
  mockUploadFileResposeDTO,
  mockUploadFileUseCase
} from '@/test/unit/data/mocks'
import { mockDocumentEntity } from '@/test/utilities/mocks'
import { UploadDocumentRequestDTO } from '@/domain'

describe('Create document use case', function() {
  const useCase = new CreateDocumentUseCaseImpl({
    createCrudUseCase: mockCreateCrudUseCase,
    uploadFileUseCase: mockUploadFileUseCase
  })

  const mockUploadDocumentRequestDTO: UploadDocumentRequestDTO = {
    ...mockDocumentEntity,
    file: mockUploadFileRequestDTO
  }

  it('Should upload document and call create', async function() {
    // Arrange
    sinon.stub(mockUploadFileUseCase, 'upload').withArgs({
      ...mockUploadDocumentRequestDTO.file,
      description: mockDocumentEntity.description
    }).resolves(mockUploadFileResposeDTO)

    sinon.stub(mockCreateCrudUseCase, 'create').withArgs({
      description: mockDocumentEntity.description,
      ...mockUploadFileResposeDTO
    }).resolves(mockDocumentEntity)


    // Act
    const receivedDocument = await useCase.create(mockUploadDocumentRequestDTO)

    // Assert
    const expectedDocument = mockDocumentEntity
    expect(receivedDocument).toEqual(expectedDocument)
  })
})

afterEach(() => sinon.restore())