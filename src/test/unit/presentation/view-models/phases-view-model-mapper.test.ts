import {
  CreatePhasesRequestViewModel,
  CreatePhasesResponseViewModel,
  PhasesViewModelMapper,
  UpdatePhasesRequestViewModel,
  UpdatePhasesResponseViewModel,
  ReadPhasesRequestViewModel,
  ReadPhasesResponseViewModel
} from '@/presentation/features/phases'
import { CreatePhasesRequestDTO, ReadCrudRequestDTO, ReadPhaseResponseDTO, UpdatePhasesRequestDTO } from '@/domain'
import { mockFiltersWithId } from '../mocks'

describe('Phases View Model Mapper', function() {
  const viewModelMapper = new PhasesViewModelMapper()

  const createUpdateRequestDTO: any = {
    id: 1,
    description: 'TESTE DE PASSOS',
  }
  const responsetDTO: any = {
    ...createUpdateRequestDTO
  }
  describe('Create', function() {
    it('Should transform request view model to request dto', function() {
      const requestViewModel: CreatePhasesRequestViewModel = createUpdateRequestDTO
      expect(viewModelMapper.fromCreateRequestViewModelToCreateRequestDTO(requestViewModel)).toEqual(responsetDTO as CreatePhasesRequestDTO)
    })

    it('Should transform response dto to response view model', function() {
      const responseViewModel: CreatePhasesResponseViewModel = responsetDTO
      expect(viewModelMapper.fromCreateResponseDTOToCreateResponseViewModel(responsetDTO as ReadPhaseResponseDTO)).toEqual(responseViewModel)
    })
  })

  describe('Update', function() {
    it('Should transform request view model to request dto', function() {
      const requestViewModel: UpdatePhasesRequestViewModel = createUpdateRequestDTO
      expect(viewModelMapper.fromUpdateRequestViewModelToUpdateRequestDTO(requestViewModel)).toEqual(responsetDTO as UpdatePhasesRequestDTO)
    })

    it('Should transform response dto to response view model', function() {
      const responseViewModel: UpdatePhasesResponseViewModel = responsetDTO
      expect(viewModelMapper.fromUpdateResponseDTOToUpdateResponseViewModel(responsetDTO as ReadPhaseResponseDTO)).toEqual(responseViewModel)
    })
  })

  describe('Read', function() {
    it('Should transform read request view model to read request dto', function() {
      const requestViewModel: ReadPhasesRequestViewModel = {
        id: 1
      }

      expect(viewModelMapper.fromReadRequestViewModelToFilters(requestViewModel)).toEqual(mockFiltersWithId)
    })

    it('Should transform read response dto to read response view model', async function() {
      const readResponseViewModel: ReadPhasesResponseViewModel[] = [responsetDTO]
      expect(viewModelMapper.fromReadManyResponseDTOToReadResponseOneViewModel([responsetDTO] as ReadPhaseResponseDTO[])).toEqual(readResponseViewModel)
    })
  })
})
