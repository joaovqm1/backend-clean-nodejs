import {
  StateViewModelMapper,
  ReadStateRequestViewModel,
  ReadStateResponseViewModel
} from '@/presentation'
import { ReadCrudRequestDTO, ReadStateResponseDTO } from '@/domain'
import { mockStateEntity } from '@/test/utilities/mocks'
import { mockFiltersWithId } from '../mocks'

describe('State View Model Mapper', function() {
  const viewModelMapper = new StateViewModelMapper()

  const responsetDTO: ReadStateResponseDTO = mockStateEntity

  describe('Read', function() {
    it('Should transform read request view model to read request dto', function() {
      const requestViewModel: ReadStateRequestViewModel = {
        id: 1
      }

      expect(viewModelMapper.fromReadRequestViewModelToFilters(requestViewModel)).toEqual(mockFiltersWithId)
    })

    it('Should transform read one response dto to read one response view mdoel', async function() {
      const readResponseViewModel: ReadStateResponseViewModel = responsetDTO
      expect(viewModelMapper.fromReadOneResponseDTOToReadResponseOneViewModel(responsetDTO as ReadStateResponseDTO)).toEqual(readResponseViewModel)
    })

    it('Should transform read many response dto to read many response view mdoel', async function() {
      const readResponseViewModel: ReadStateResponseViewModel[] = [responsetDTO]
      expect(viewModelMapper.fromReadManyResponseDTOToReadResponseOneViewModel([responsetDTO] as ReadStateResponseDTO[])).toEqual(readResponseViewModel)
    })
  })
})
