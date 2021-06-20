import {
  CreateDocumentRequestViewModel,
  CreateDocumentResponseViewModel,
  DocumentViewModelMapper,
  UpdateDocumentRequestViewModel,
  UpdateDocumentResponseViewModel,
  ReadDocumentRequestViewModel,
  ReadDocumentResponseViewModel
} from '@/presentation/features/document'
import { ReadDocumentResponseDTO, UpdateDocumentRequestDTO } from '@/domain'
import { mockFiltersWithId } from '../mocks'

describe('Document View Model Mapper', function() {
  const viewModelMapper = new DocumentViewModelMapper()

  const createUpdateRequestDTO: any = {
    id: 1,
    description: 'TITULO DE DOCUMENTO',
    name: 'NOME DO DOCUMENTO',
    path: '/SRC/DOCUMENTO',
    extension: '.PDF',
    mimeType: 'MIMETYPE',
  }

  const responsetDTO: any = {
    ...createUpdateRequestDTO,
    description: 'TITULO DE DOCUMENTO',
    name: 'NOME DO DOCUMENTO',
    path: '/SRC/DOCUMENTO',
    extension: '.PDF',
    mimeType: 'MIMETYPE',
  }

  describe('Create', function() {
    it('Should transform request view model to request dto', function() {
      const requestViewModel: CreateDocumentRequestViewModel = {
        ...createUpdateRequestDTO
      }

      expect(viewModelMapper.fromCreateRequestViewModelToCreateRequestDTO(requestViewModel)).toEqual({
        ...createUpdateRequestDTO,
        name: createUpdateRequestDTO.name.toUpperCase(),
        description: createUpdateRequestDTO.description.toUpperCase(),
        path: createUpdateRequestDTO.path.toUpperCase(),
        extension: createUpdateRequestDTO.extension.toUpperCase(),
        mimeType: createUpdateRequestDTO.mimeType.toUpperCase()
      })
    })

    it('Should transform response dto to response view model', function() {
      const responseViewModel: CreateDocumentResponseViewModel = responsetDTO
      expect(viewModelMapper.fromCreateResponseDTOToCreateResponseViewModel(responsetDTO as ReadDocumentResponseDTO)).toEqual(responseViewModel)
    })
  })

  describe('Update', function() {
    it('Should transform request view model to request dto', function() {
      const requestViewModel: UpdateDocumentRequestViewModel = {
        ...createUpdateRequestDTO
      }
      expect(viewModelMapper.fromUpdateRequestViewModelToUpdateRequestDTO(requestViewModel)).toEqual(responsetDTO as UpdateDocumentRequestDTO)
    })

    it('Should transform response dto to response view model', function() {
      const responseViewModel: UpdateDocumentResponseViewModel = responsetDTO
      expect(viewModelMapper.fromUpdateResponseDTOToUpdateResponseViewModel(responsetDTO as ReadDocumentResponseDTO)).toEqual(responseViewModel)
    })
  })

  describe('Read', function() {
    it('Should transform read request view model to read request dto', function() {
      const requestViewModel: ReadDocumentRequestViewModel = {
        id: 1
      }

      expect(viewModelMapper.fromReadRequestViewModelToFilters(requestViewModel)).toEqual(mockFiltersWithId)
    })

    it('Should transform read one response dto to read one response view mdoel', async function() {
      const readResponseViewModel: ReadDocumentResponseViewModel = responsetDTO
      expect(viewModelMapper.fromReadOneResponseDTOToReadResponseOneViewModel(responsetDTO as ReadDocumentResponseDTO)).toEqual(readResponseViewModel)
    })

    it('Should transform read many response dto to read many response view mdoel', async function() {
      const readResponseViewModel: ReadDocumentResponseViewModel[] = [responsetDTO]
      expect(viewModelMapper.fromReadManyResponseDTOToReadResponseOneViewModel([responsetDTO] as ReadDocumentResponseDTO[])).toEqual(readResponseViewModel)
    })
  })
})
