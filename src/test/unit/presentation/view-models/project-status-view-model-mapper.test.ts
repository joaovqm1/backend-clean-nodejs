import {
  CreateProjectStatusRequestViewModel,
  CreateProjectStatusResponseViewModel,
  ProjectStatusViewModelMapper,
  UpdateProjectStatusRequestViewModel,
  UpdateProjectStatusResponseViewModel,
  ReadProjectStatusRequestViewModel,
  ReadProjectStatusResponseViewModel
} from '@/presentation/features/project-status'
import { CreateProjectStatusRequestDTO, ReadCrudRequestDTO, ReadProjectStatusResponseDTO, UpdateProjectStatusRequestDTO } from '@/domain'
import { mockFiltersWithId } from '../mocks'

describe('ProjectStatus View Model Mapper', function() {
  const viewModelMapper = new ProjectStatusViewModelMapper()

  const createUpdateRequestDTO: any = {
    id: 1,
    description: 'TESTE DE STATUS DE ACADEMIA',
  }
  const responsetDTO: any = {
    ...createUpdateRequestDTO
  }
  describe('Create', function() {
    it('Should transform request view model to request dto', function() {
      const requestViewModel: CreateProjectStatusRequestViewModel = createUpdateRequestDTO
      expect(viewModelMapper.fromCreateRequestViewModelToCreateRequestDTO(requestViewModel)).toEqual(responsetDTO as CreateProjectStatusRequestDTO)
    })

    it('Should transform response dto to response view model', function() {
      const responseViewModel: CreateProjectStatusResponseViewModel = responsetDTO
      expect(viewModelMapper.fromCreateResponseDTOToCreateResponseViewModel(responsetDTO as ReadProjectStatusResponseDTO)).toEqual(responseViewModel)
    })
  })

  describe('Update', function() {
    it('Should transform request view model to request dto', function() {
      const requestViewModel: UpdateProjectStatusRequestViewModel = createUpdateRequestDTO
      expect(viewModelMapper.fromUpdateRequestViewModelToUpdateRequestDTO(requestViewModel)).toEqual(responsetDTO as UpdateProjectStatusRequestDTO)
    })

    it('Should transform response dto to response view model', function() {
      const responseViewModel: UpdateProjectStatusResponseViewModel = responsetDTO
      expect(viewModelMapper.fromUpdateResponseDTOToUpdateResponseViewModel(responsetDTO as ReadProjectStatusResponseDTO)).toEqual(responseViewModel)
    })
  })

  describe('Read', function() {
    it('Should transform read request view model to read request dto', function() {
      const requestViewModel: ReadProjectStatusRequestViewModel = {
        id: 1
      }

      expect(viewModelMapper.fromReadRequestViewModelToFilters(requestViewModel)).toEqual(mockFiltersWithId)
    })

    it('Should transform read response dto to read response view model', async function() {
      const readResponseViewModel: ReadProjectStatusResponseViewModel[] = [responsetDTO]
      expect(viewModelMapper.fromReadManyResponseDTOToReadResponseOneViewModel([responsetDTO] as ReadProjectStatusResponseDTO[])).toEqual(readResponseViewModel)
    })
  })
})
