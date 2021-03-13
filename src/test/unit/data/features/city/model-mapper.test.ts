import { CityModelMapper, CityModel } from '@/data'
import { ReadCityResponseDTO } from '@/domain'
import { mockCityEntity as entity } from '@/test/utilities/mocks'

describe('Data - City Model Mapper', function() {
  const modelMapper = new CityModelMapper()

  const model: CityModel = entity

  describe('Read', function() {
    it('Should transform model to read one response dto', function() {
      const readResponse: ReadCityResponseDTO = entity
      expect(modelMapper.fromModelToReadOneResponse(model)).toEqual(readResponse)
    })

    it('Should transform model to read many response dto', function() {
      const readResponse: ReadCityResponseDTO = entity
      expect(modelMapper.fromModelToReadManyResponse([model])).toEqual([readResponse])
    })
  })
})
