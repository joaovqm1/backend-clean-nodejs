import {
  CreateBankRequestViewModel,
  CreateBankResponseViewModel,
  BankViewModelMapper,
  UpdateBankRequestViewModel,
  UpdateBankResponseViewModel,
  ReadBankRequestViewModel,
  ReadBankResponseViewModel
} from '@/presentation/features/bank'
import { CreateBankRequestDTO, ReadCrudRequestDTO, ReadBankResponseDTO, UpdateBankRequestDTO } from '@/domain'
import { mockFiltersWithId } from '../mocks'

describe('Bank View Model Mapper', function() {
  const viewModelMapper = new BankViewModelMapper()

  const createUpdateRequestDTO: any = {
    id: 1,
    name: 'BRADESCO',
    number: '12345-6',
  }
  const responsetDTO: any = {
    ...createUpdateRequestDTO
  }
  describe('Create', function() {
    it('Should transform request view model to request dto', function() {
      const requestViewModel: CreateBankRequestViewModel = createUpdateRequestDTO
      expect(viewModelMapper.fromCreateRequestViewModelToCreateRequestDTO(requestViewModel)).toEqual(responsetDTO as CreateBankRequestDTO)
    })

    it('Should transform response dto to response view model', function() {
      const responseViewModel: CreateBankResponseViewModel = responsetDTO
      expect(viewModelMapper.fromCreateResponseDTOToCreateResponseViewModel(responsetDTO as ReadBankResponseDTO)).toEqual(responseViewModel)
    })
  })

  describe('Update', function() {
    it('Should transform request view model to request dto', function() {
      const requestViewModel: UpdateBankRequestViewModel = createUpdateRequestDTO
      expect(viewModelMapper.fromUpdateRequestViewModelToUpdateRequestDTO(requestViewModel)).toEqual(responsetDTO as UpdateBankRequestDTO)
    })

    it('Should transform response dto to response view model', function() {
      const responseViewModel: UpdateBankResponseViewModel = responsetDTO
      expect(viewModelMapper.fromUpdateResponseDTOToUpdateResponseViewModel(responsetDTO as ReadBankResponseDTO)).toEqual(responseViewModel)
    })
  })

  describe('Read', function() {
    it('Should transform read request view model to read request dto', function() {
      const requestViewModel: ReadBankRequestViewModel = {
        id: 1
      }

      expect(viewModelMapper.fromReadRequestViewModelToFilters(requestViewModel)).toEqual(mockFiltersWithId)
    })

    it('Should transform read response dto to read response view model', async function() {
      const readResponseViewModel: ReadBankResponseViewModel[] = [responsetDTO]
      expect(viewModelMapper.fromReadManyResponseDTOToReadResponseOneViewModel([responsetDTO] as ReadBankResponseDTO[])).toEqual(readResponseViewModel)
    })
  })
})
