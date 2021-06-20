import {
  CreateProjectRequestViewModel,
  CreateProjectResponseViewModel,
  ProjectViewModelMapper,
  UpdateProjectRequestViewModel,
  UpdateProjectResponseViewModel,
  ReadProjectRequestViewModel,
  ReadProjectResponseViewModel,
  FinanceStatusViewModel
} from '@/presentation'
import {
  Filter,
  FinanceStatus,
  projectFieldsToInclude,
  ReadProjectResponseDTO,
} from '@/domain'
import { mockFiltersWithId } from '../mocks'
import { mockCreateProjectRequestDTO } from '../../data/mocks'
import { mockProjectEntity } from '@/test/utilities/mocks'
import { stringUtilities } from '@/main'

describe('Project View Model Mapper', function() {
  const viewModelMapper = new ProjectViewModelMapper(stringUtilities)

  const responseDTO: ReadProjectResponseDTO = {
    ...mockProjectEntity
  }

  describe('Create', function() {
    it('Should transform request view model to request dto', function() {
      const requestViewModel: CreateProjectRequestViewModel = {
        ...mockCreateProjectRequestDTO,
        payment: {
          ...mockCreateProjectRequestDTO.payment,
          finances: mockCreateProjectRequestDTO.payment.finances.map((finance) => {
            return { ...finance, status: FinanceStatusViewModel.NOTRECEIVED }
          })
        }
      }
      expect(viewModelMapper.fromCreateRequestViewModelToCreateRequestDTO(requestViewModel)).toEqual(mockCreateProjectRequestDTO)
    })

    it('Should transform response dto to response view model', function() {
      const responseViewModel: CreateProjectResponseViewModel = {
        ...responseDTO,
        finances: responseDTO.finances.map((finance) => {
          return {
            ...finance,
            status: finance.status === FinanceStatus.OPENED ?
              FinanceStatusViewModel.NOTRECEIVED : FinanceStatusViewModel.RECEIVED
          }
        })
      }
      expect(viewModelMapper.fromCreateResponseDTOToCreateResponseViewModel(responseDTO as ReadProjectResponseDTO))
        .toEqual(responseViewModel)
    })
  })

  describe('Update', function() {
    it('Should transform request view model to request dto', function() {
      const requestViewModel: UpdateProjectRequestViewModel = {
        id: 1,
        ...mockCreateProjectRequestDTO,
        payment: {
          ...mockCreateProjectRequestDTO.payment,
          finances: mockCreateProjectRequestDTO.payment.finances.map((finance) => {
            return { ...finance, status: FinanceStatusViewModel.NOTRECEIVED }
          })
        }
      }
      expect(viewModelMapper.fromUpdateRequestViewModelToUpdateRequestDTO(requestViewModel)).toEqual({
        id: 1,
        ...mockCreateProjectRequestDTO
      })
    })

    it('Should transform response dto to response view model', function() {
      const responseViewModel: UpdateProjectResponseViewModel = {
        ...responseDTO,
        finances: responseDTO.finances.map((finance) => {
          return {
            ...finance,
            status: finance.status === FinanceStatus.OPENED ?
              FinanceStatusViewModel.NOTRECEIVED : FinanceStatusViewModel.RECEIVED
          }
        })
      }

      expect(viewModelMapper.fromUpdateResponseDTOToUpdateResponseViewModel(responseDTO as ReadProjectResponseDTO)).toEqual(responseViewModel)
    })
  })

  describe('Read', function() {
    it('Should transform read request view model to read request dto', function() {
      const requestViewModel: ReadProjectRequestViewModel = {
        id: 1
      }

      const mockFilters: Filter[] = mockFiltersWithId.concat([{ name: 'include', fields: projectFieldsToInclude }])

      expect(viewModelMapper.fromReadRequestViewModelToFilters(requestViewModel)).toEqual(mockFilters)
    })

    it('Should transform read response dto to read response view model', async function() {
      const readResponseViewModel: ReadProjectResponseViewModel[] = [{
        ...responseDTO,
        finances: responseDTO.finances.map((finance) => {
          return {
            ...finance,
            status: finance.status === FinanceStatus.OPENED ?
              FinanceStatusViewModel.NOTRECEIVED : FinanceStatusViewModel.RECEIVED
          }
        })
      }]
      expect(viewModelMapper.fromReadManyResponseDTOToReadResponseOneViewModel([responseDTO] as ReadProjectResponseDTO[])).toEqual(readResponseViewModel)
    })
  })
})
