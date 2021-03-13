import {
  CityViewModelMapper,
  ReadCityRequestViewModel,
  ReadCityResponseViewModel
} from '@/presentation'
import { ReadCrudRequestDTO, ReadCityResponseDTO, cityFieldsToInclude } from '@/domain'
import { mockCityEntity } from '@/test/utilities/mocks'

describe('City View Model Mapper', function() {
  const viewModelMapper = new CityViewModelMapper()

  const responsetDTO: ReadCityResponseDTO = mockCityEntity

  describe('Read', function() {
    it('Should transform read request view model to read request dto', function() {
      const requestViewModel: ReadCityRequestViewModel = {
        id: 1
      }

      const requestDTO: ReadCrudRequestDTO = {
        filters: [{
          equalTo: {
            id: requestViewModel.id
          }
        }],
        fieldsToInclude: cityFieldsToInclude
      }

      expect(viewModelMapper.fromReadRequestViewModelToReadRequestDTO(requestViewModel)).toEqual(requestDTO)
    })

    it('Should transform read one response dto to read one response view mdoel', async function() {
      const readResponseViewModel: ReadCityResponseViewModel = responsetDTO
      expect(viewModelMapper.fromReadOneResponseDTOToReadResponseOneViewModel(responsetDTO as ReadCityResponseDTO)).toEqual(readResponseViewModel)
    })

    it('Should transform read many response dto to read many response view mdoel', async function() {
      const readResponseViewModel: ReadCityResponseViewModel[] = [responsetDTO]
      expect(viewModelMapper.fromReadManyResponseDTOToReadResponseOneViewModel([responsetDTO] as ReadCityResponseDTO[])).toEqual(readResponseViewModel)
    })
  })
})
