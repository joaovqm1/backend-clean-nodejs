import {
  CreateScopeRequestViewModel,
  CreateScopeResponseViewModel,
  ScopeViewModelMapper,
  UpdateScopeRequestViewModel,
  UpdateScopeResponseViewModel,
  ReadScopeRequestViewModel,
  ReadScopeResponseViewModel
} from '@/presentation/features/scope'
import { CreateScopeRequestDTO, ReadCrudRequestDTO, ReadScopeResponseDTO, UpdateScopeRequestDTO } from '@/domain'
import { mockFiltersWithId } from '../mocks'

describe('Scope View Model Mapper', function() {
  const viewModelMapper = new ScopeViewModelMapper()

  const createUpdateRequestDTO: any = {
    id: 1,
    description: 'TESTE DE ESCOPO',
  }
  const responsetDTO: any = {
    ...createUpdateRequestDTO
  }
  describe('Create', function() {
    it('Should transform request view model to request dto', function() {
      const requestViewModel: CreateScopeRequestViewModel = createUpdateRequestDTO
      expect(viewModelMapper.fromCreateRequestViewModelToCreateRequestDTO(requestViewModel)).toEqual(responsetDTO as CreateScopeRequestDTO)
    })

    it('Should transform response dto to response view model', function() {
      const responseViewModel: CreateScopeResponseViewModel = responsetDTO
      expect(viewModelMapper.fromCreateResponseDTOToCreateResponseViewModel(responsetDTO as ReadScopeResponseDTO)).toEqual(responseViewModel)
    })
  })

  describe('Update', function() {
    it('Should transform request view model to request dto', function() {
      const requestViewModel: UpdateScopeRequestViewModel = createUpdateRequestDTO
      expect(viewModelMapper.fromUpdateRequestViewModelToUpdateRequestDTO(requestViewModel)).toEqual(responsetDTO as UpdateScopeRequestDTO)
    })

    it('Should transform response dto to response view model', function() {
      const responseViewModel: UpdateScopeResponseViewModel = responsetDTO
      expect(viewModelMapper.fromUpdateResponseDTOToUpdateResponseViewModel(responsetDTO as ReadScopeResponseDTO)).toEqual(responseViewModel)
    })
  })

  describe('Read', function() {
    it('Should transform read request view model to read request dto', function() {
      const requestViewModel: ReadScopeRequestViewModel = {
        id: 1
      }

      expect(viewModelMapper.fromReadRequestViewModelToFilters(requestViewModel)).toEqual(mockFiltersWithId)
    })

    it('Should transform read response dto to read response view model', async function() {
      const readResponseViewModel: ReadScopeResponseViewModel[] = [responsetDTO]
      expect(viewModelMapper.fromReadManyResponseDTOToReadResponseOneViewModel([responsetDTO] as ReadScopeResponseDTO[])).toEqual(readResponseViewModel)
    })
  })
})
