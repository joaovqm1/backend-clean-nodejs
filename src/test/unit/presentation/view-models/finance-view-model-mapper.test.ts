




import {
  CreateFinanceRequestViewModel,
  CreateFinanceResponseViewModel,
  FinanceViewModelMapper,
  UpdateFinanceRequestViewModel,
  UpdateFinanceResponseViewModel,
  ReadFinanceRequestViewModel,
  ReadFinanceResponseViewModel,
  FinanceStatusViewModel
} from '@/presentation/features/finance'
import { CreateFinanceRequestDTO, Filter, financeFieldsToInclude, FinanceStatus, FinanceType, ReadCrudRequestDTO, ReadFinanceResponseDTO, UpdateFinanceRequestDTO } from '@/domain'
import { dateUtilities, objectUtilities } from '@/main'
import { mockFiltersWithId } from '../mocks'

describe('Finance View Model Mapper', function() {
  const viewModelMapper = new FinanceViewModelMapper(FinanceType.INCOME)

  const createUpdateRequestDTO: CreateFinanceRequestDTO = {
    description: 'TESTE DE FINANCAS',
    customerSupplier: {
      id: 1,
      name: 'FINANCAS'
    },
    type: FinanceType.INCOME,
    status: FinanceStatus.OPENED,
    finishDate: dateUtilities.format(new Date()),
    dateToFinish: dateUtilities.format(new Date()),
    value: 12,
    financeType: {
      id: 1
    },
    financeMethod: {
      id: 1
    }
  }
  const responseDTO: any = {
    ...createUpdateRequestDTO
  }
  describe('Create', function() {
    it('Should transform request view model to request dto to status ABERTA', function() {
      const requestViewModel: CreateFinanceRequestViewModel = {
        ...createUpdateRequestDTO,
        status: FinanceStatusViewModel.NOTRECEIVED
      }
      const requestViewModelCopy = objectUtilities.cloneObject(responseDTO)
      delete requestViewModelCopy.finishDate
      expect(viewModelMapper.fromCreateRequestViewModelToCreateRequestDTO(requestViewModel)).toEqual(requestViewModelCopy as CreateFinanceRequestDTO)
    })

    it('Should transform request view model to request dto to status FINALIZADA', function() {
      const requestViewModel: CreateFinanceRequestViewModel = {
        ...createUpdateRequestDTO,
        status: FinanceStatusViewModel.RECEIVED
      }

      let requestViewModelCopy = objectUtilities.cloneObject(responseDTO)
      requestViewModelCopy.status = FinanceStatus.FINISHED
      delete requestViewModelCopy.dateToFinish

      expect(viewModelMapper.fromCreateRequestViewModelToCreateRequestDTO(requestViewModel))
        .toEqual(requestViewModelCopy as CreateFinanceRequestDTO)
    })

    it('Should transform response dto to response view model', function() {
      const responseViewModel: CreateFinanceResponseViewModel = responseDTO
      expect(viewModelMapper.fromCreateResponseDTOToCreateResponseViewModel(
        responseDTO as ReadFinanceResponseDTO))
        .toEqual({
          ...responseViewModel,
          status: FinanceStatusViewModel.NOTRECEIVED
        })
    })
  })

  describe('Update', function() {
    it('Should transform request view model to request dto', function() {
      const requestViewModel: UpdateFinanceRequestViewModel = {
        id: 1,
        ...createUpdateRequestDTO,
        status: FinanceStatusViewModel.NOTRECEIVED
      }
      expect(viewModelMapper.fromUpdateRequestViewModelToUpdateRequestDTO(requestViewModel)).toEqual({
        ...responseDTO as UpdateFinanceRequestDTO,
        id: 1
      })
    })

    it('Should transform response dto to response view model', function() {
      const responseViewModel: UpdateFinanceResponseViewModel = responseDTO
      expect(
        viewModelMapper.fromUpdateResponseDTOToUpdateResponseViewModel(responseDTO as ReadFinanceResponseDTO))
        .toEqual({
          ...responseDTO,
          status: FinanceStatusViewModel.NOTRECEIVED
        })
    })
  })

  describe('Read', function() {
    it('Should transform read request view model to read request dto', function() {
      const requestViewModel: ReadFinanceRequestViewModel = {
        id: 1
      }

      const mockFilters: Filter[] = mockFiltersWithId.concat([{ name: 'include', fields: financeFieldsToInclude }])

      expect(viewModelMapper.fromReadRequestViewModelToFilters(requestViewModel)).toEqual(mockFilters)
    })

    it('Should transform read response dto to read response view model', async function() {
      const readResponseViewModel: ReadFinanceResponseViewModel[] = [responseDTO]
      expect(
        viewModelMapper.fromReadManyResponseDTOToReadResponseOneViewModel([responseDTO] as ReadFinanceResponseDTO[])
      ).toEqual([{
        ...responseDTO,
        status: FinanceStatusViewModel.NOTRECEIVED
      }])
    })
  })
})
