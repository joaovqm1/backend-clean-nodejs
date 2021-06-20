import {
  CreateProjectTypeRequestViewModel,
  CreateProjectTypeResponseViewModel,
  ProjectTypeViewModelMapper,
  UpdateProjectTypeRequestViewModel,
  UpdateProjectTypeResponseViewModel,
  ReadProjectTypeRequestViewModel,
  ReadProjectTypeResponseViewModel
} from '@/presentation/features/project-type'
import { CreateProjectTypeRequestDTO, ReadCrudRequestDTO, ReadProjectTypeResponseDTO, UpdateProjectTypeRequestDTO } from '@/domain'
import { mockFiltersWithId } from '../mocks'

describe('ProjectType View Model Mapper', function() {
  const viewModelMapper = new ProjectTypeViewModelMapper()

  const createUpdateRequestDTO: any = {
    id: 1,
    description: 'TESTE DE STATUS DE ACADEMIA',
  }
  const responsetDTO: any = {
    ...createUpdateRequestDTO
  }
  describe('Create', function() {
    it('Should transform request view model to request dto', function() {
      const requestViewModel: CreateProjectTypeRequestViewModel = createUpdateRequestDTO
      expect(viewModelMapper.fromCreateRequestViewModelToCreateRequestDTO(requestViewModel)).toEqual(responsetDTO as CreateProjectTypeRequestDTO)
    })

    it('Should transform response dto to response view model', function() {
      const responseViewModel: CreateProjectTypeResponseViewModel = responsetDTO
      expect(viewModelMapper.fromCreateResponseDTOToCreateResponseViewModel(responsetDTO as ReadProjectTypeResponseDTO)).toEqual(responseViewModel)
    })
  })

  describe('Update', function() {
    it('Should transform request view model to request dto', function() {
      const requestViewModel: UpdateProjectTypeRequestViewModel = createUpdateRequestDTO
      expect(viewModelMapper.fromUpdateRequestViewModelToUpdateRequestDTO(requestViewModel)).toEqual(responsetDTO as UpdateProjectTypeRequestDTO)
    })

    it('Should transform response dto to response view model', function() {
      const responseViewModel: UpdateProjectTypeResponseViewModel = responsetDTO
      expect(viewModelMapper.fromUpdateResponseDTOToUpdateResponseViewModel(responsetDTO as ReadProjectTypeResponseDTO)).toEqual(responseViewModel)
    })
  })

  describe('Read', function() {
    it('Should transform read request view model to read request dto', function() {
      const requestViewModel: ReadProjectTypeRequestViewModel = {
        id: 1
      }

      expect(viewModelMapper.fromReadRequestViewModelToFilters(requestViewModel)).toEqual(mockFiltersWithId)
    })

    it('Should transform read response dto to read response view model', async function() {
      const readResponseViewModel: ReadProjectTypeResponseViewModel[] = [responsetDTO]
      expect(viewModelMapper.fromReadManyResponseDTOToReadResponseOneViewModel([responsetDTO] as ReadProjectTypeResponseDTO[])).toEqual(readResponseViewModel)
    })
  })
})
