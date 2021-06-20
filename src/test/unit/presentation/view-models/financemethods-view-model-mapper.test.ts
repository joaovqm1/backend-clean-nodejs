import {
  CreateFinanceMethodRequestViewModel,
  CreateFinanceMethodResponseViewModel,
  FinanceMethodViewModelMapper,
  UpdateFinanceMethodRequestViewModel,
  UpdateFinanceMethodResponseViewModel,
  ReadFinanceMethodRequestViewModel,
  ReadFinanceMethodResponseViewModel
} from '@/presentation/features/finance-method'
import { CreateFinanceMethodRequestDTO, ReadCrudRequestDTO, ReadFinanceMethodResponseDTO, UpdateFinanceMethodRequestDTO } from '@/domain'
import { mockFiltersWithId } from '../mocks'

describe('FinanceMethod View Model Mapper', function() {
  const viewModelMapper = new FinanceMethodViewModelMapper()

  const createUpdateRequestDTO: any = {
    id: 1,
    description: 'TESTE DE MÉTODOS FINANCEIROS',
  }
  const responsetDTO: any = {
    ...createUpdateRequestDTO
  }
  describe('Create', function() {
    it('Should transform request view model to request dto', function() {
      const requestViewModel: CreateFinanceMethodRequestViewModel = createUpdateRequestDTO
      expect(viewModelMapper.fromCreateRequestViewModelToCreateRequestDTO(requestViewModel)).toEqual(responsetDTO as CreateFinanceMethodRequestDTO)
    })

    it('Should transform response dto to response view model', function() {
      const responseViewModel: CreateFinanceMethodResponseViewModel = responsetDTO
      expect(viewModelMapper.fromCreateResponseDTOToCreateResponseViewModel(responsetDTO as ReadFinanceMethodResponseDTO)).toEqual(responseViewModel)
    })
  })

  describe('Update', function() {
    it('Should transform request view model to request dto', function() {
      const requestViewModel: UpdateFinanceMethodRequestViewModel = createUpdateRequestDTO
      expect(viewModelMapper.fromUpdateRequestViewModelToUpdateRequestDTO(requestViewModel)).toEqual(responsetDTO as UpdateFinanceMethodRequestDTO)
    })

    it('Should transform response dto to response view model', function() {
      const responseViewModel: UpdateFinanceMethodResponseViewModel = responsetDTO
      expect(viewModelMapper.fromUpdateResponseDTOToUpdateResponseViewModel(responsetDTO as ReadFinanceMethodResponseDTO)).toEqual(responseViewModel)
    })
  })

  describe('Read', function() {
    it('Should transform read request view model to read request dto', function() {
      const requestViewModel: ReadFinanceMethodRequestViewModel = {
        id: 1
      }

      expect(viewModelMapper.fromReadRequestViewModelToFilters(requestViewModel)).toEqual(mockFiltersWithId)
    })

    it('Should transform read response dto to read response view model', async function() {
      const readResponseViewModel: ReadFinanceMethodResponseViewModel[] = [responsetDTO]
      expect(viewModelMapper.fromReadManyResponseDTOToReadResponseOneViewModel([responsetDTO] as ReadFinanceMethodResponseDTO[])).toEqual(readResponseViewModel)
    })
  })
})
