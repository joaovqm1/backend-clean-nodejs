import {
  CreateFinanceTypeRequestViewModel,
  CreateFinanceTypeResponseViewModel,
  FinanceTypeViewModelMapper,
  UpdateFinanceTypeRequestViewModel,
  UpdateFinanceTypeResponseViewModel,
  ReadFinanceTypeRequestViewModel,
  ReadFinanceTypeResponseViewModel
} from '@/presentation/features/finance-type'
import {
  CreateFinanceTypeRequestDTO,
  ReadCrudRequestDTO,
  ReadFinanceTypeResponseDTO,
  FinanceTypeEnum,
  UpdateFinanceTypeRequestDTO
} from '@/domain'
import faker from 'faker'
import { mockFiltersWithId } from '../mocks'

describe('FinanceType View Model Mapper', function() {
  const viewModelMapper = new FinanceTypeViewModelMapper()
  const randomFinanceType = FinanceTypeEnum[
    faker.helpers.replaceSymbolWithNumber(
      faker.random.arrayElement(Object.getOwnPropertyNames(FinanceTypeEnum))
    )
  ]
  const createUpdateRequestDTO: any = {
    id: 1,
    description: 'TESTE DE TIPOS FINANCEIROS',
    type: randomFinanceType
  }
  const responsetDTO: any = {
    ...createUpdateRequestDTO
  }
  describe('Create', function() {
    it('Should transform request view model to request dto', function() {
      const requestViewModel: CreateFinanceTypeRequestViewModel = createUpdateRequestDTO
      expect(viewModelMapper.fromCreateRequestViewModelToCreateRequestDTO(requestViewModel)).toEqual(responsetDTO as CreateFinanceTypeRequestDTO)
    })

    it('Should transform response dto to response view model', function() {
      const responseViewModel: CreateFinanceTypeResponseViewModel = responsetDTO
      expect(viewModelMapper.fromCreateResponseDTOToCreateResponseViewModel(responsetDTO as ReadFinanceTypeResponseDTO)).toEqual(responseViewModel)
    })
  })

  describe('Update', function() {
    it('Should transform request view model to request dto', function() {
      const requestViewModel: UpdateFinanceTypeRequestViewModel = createUpdateRequestDTO
      expect(viewModelMapper.fromUpdateRequestViewModelToUpdateRequestDTO(requestViewModel)).toEqual(responsetDTO as UpdateFinanceTypeRequestDTO)
    })

    it('Should transform response dto to response view model', function() {
      const responseViewModel: UpdateFinanceTypeResponseViewModel = responsetDTO
      expect(viewModelMapper.fromUpdateResponseDTOToUpdateResponseViewModel(responsetDTO as ReadFinanceTypeResponseDTO)).toEqual(responseViewModel)
    })
  })

  describe('Read', function() {
    it('Should transform read request view model to read request dto', function() {
      const requestViewModel: ReadFinanceTypeRequestViewModel = {
        id: 1
      }

      expect(viewModelMapper.fromReadRequestViewModelToFilters(requestViewModel)).toEqual(mockFiltersWithId)
    })

    it('Should transform read response dto to read response view model', async function() {
      const readResponseViewModel: ReadFinanceTypeResponseViewModel[] = [responsetDTO]
      expect(viewModelMapper.fromReadManyResponseDTOToReadResponseOneViewModel([responsetDTO] as ReadFinanceTypeResponseDTO[])).toEqual(readResponseViewModel)
    })
  })
})
