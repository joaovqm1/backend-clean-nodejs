import { DocumentModelMapper } from '@/data'
import { CreateDocumentRequestDTO, DocumentEntity, ReadDocumentResponseDTO, UpdateDocumentRequestDTO } from '@/domain'
import { mockDocumentEntity } from '@/test/utilities/mocks'

describe('Data - Document Model Mapper', function() {
  const modelMapper = new DocumentModelMapper()

  const documentModel: DocumentEntity = {
    ...mockDocumentEntity
  }

  describe('Create', function() {
    it('Should transform create request dto to model', function() {
      const createRequestDTO: CreateDocumentRequestDTO = {
        ...mockDocumentEntity
      }
      expect(modelMapper.fromCreateRequestDTOToModel(createRequestDTO)).toEqual(documentModel)
    })
  })

  describe('Read', function() {
    it('Should transform model to read one response dto', function() {
      const readResponse: ReadDocumentResponseDTO = mockDocumentEntity
      expect(modelMapper.fromModelToReadOneResponse(documentModel)).toEqual(readResponse)
    })

    it('Should transform model to read many response dto', function() {
      const readResponse: ReadDocumentResponseDTO = mockDocumentEntity
      expect(modelMapper.fromModelToReadManyResponse([documentModel])).toEqual([readResponse])
    })
  })

  describe('Update', function() {
    it('Should transform update request dto to model', function() {
      const updateRequestDTO: UpdateDocumentRequestDTO = mockDocumentEntity
      expect(modelMapper.fromUpdateRequestDTOToModel(updateRequestDTO)).toEqual(documentModel)
    })
  })
})
