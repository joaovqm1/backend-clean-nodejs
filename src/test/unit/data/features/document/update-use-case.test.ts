import faker from 'faker'
import sinon from 'sinon'

import { UpdateDocumentUseCaseImpl } from '@/data'
import { mockStorage } from '@/test/unit/third-party/mocks'
import { mockReadCrudUseCase, mockUpdateCrudUseCase, mockUploadFileRequestDTO, mockUploadFileResposeDTO, mockUploadFileUseCase } from '@/test/unit/data/mocks'
import { mockDocumentEntity } from '@/test/utilities/mocks'
import { UploadDocumentRequestDTO } from '@/domain'

describe('Update document use case', function() {
  const useCase = new UpdateDocumentUseCaseImpl({
    readUseCase: mockReadCrudUseCase,
    updateCrudUseCase: mockUpdateCrudUseCase,
    storage: mockStorage,
    uploadFileUseCase: mockUploadFileUseCase
  })

  const mockUploadDocumentRequestDTO: UploadDocumentRequestDTO = {
    ...mockDocumentEntity,
    file: mockUploadFileRequestDTO
  }

  it('Should call remove the current document file, upload the new one and call update', async function() {
    // Arrange
    sinon.stub(mockReadCrudUseCase, 'getById').withArgs(mockDocumentEntity.id).resolves(mockDocumentEntity)

    const mockNewDocumentEntity = {
      ...mockDocumentEntity,
      path: faker.random.word()
    }

    sinon.stub(mockUploadFileUseCase, 'upload').withArgs({
      ...mockUploadFileRequestDTO,
      description: mockNewDocumentEntity.description
    }).resolves(mockUploadFileResposeDTO)

    sinon.stub(mockUpdateCrudUseCase, 'update').withArgs({
      id: mockNewDocumentEntity.id,
      description: mockNewDocumentEntity.description,
      project: mockNewDocumentEntity.project,
      ...mockUploadFileResposeDTO
    }).resolves(mockNewDocumentEntity)

    const removeSpy = jest.spyOn(mockStorage, 'remove')

    // Act
    const receivedDocument = await useCase.update({
      ...mockNewDocumentEntity,
      file: mockUploadFileRequestDTO
    })

    // Assert
    const expectedDocument = mockNewDocumentEntity
    expect(receivedDocument).toEqual(expectedDocument)
    expect(removeSpy).toBeCalledWith(mockDocumentEntity.key)
  })

  it('Should not remove the current file and call update', async function() {
    // Arrange
    const mockNewDocumentEntity = {
      ...mockDocumentEntity,
      path: mockUploadDocumentRequestDTO.file.path
    }

    sinon.stub(mockReadCrudUseCase, 'getById').withArgs(mockDocumentEntity.id).resolves(mockNewDocumentEntity)

    sinon.stub(mockUpdateCrudUseCase, 'update').withArgs({
      ...mockNewDocumentEntity
    }).resolves(mockDocumentEntity)

    // Act
    const receivedDocument = await useCase.update({
      ...mockUploadDocumentRequestDTO,
      file: undefined
    })

    // Assert
    const expectedDocument = mockDocumentEntity
    expect(receivedDocument).toEqual(expectedDocument)
  })

  it('Should retur true if paths are different', function() {
    // Arrange

    // Act
    // Assert
    expect(useCase.didPathChanged('path1', 'path2')).toBe(true)

  })
})

afterEach(() => sinon.restore())