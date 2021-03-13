import { StateModelMapper, StateModel } from '@/data'
import { ReadStateResponseDTO } from '@/domain'
import { mockStateEntity as entity } from '@/test/utilities/mocks'

describe('Data - State Model Mapper', function() {
  const modelMapper = new StateModelMapper()

  const model: StateModel = entity

  describe('Read', function() {
    it('Should transform model to read one response dto', function() {
      const readResponse: ReadStateResponseDTO = entity
      expect(modelMapper.fromModelToReadOneResponse(model)).toEqual(readResponse)
    })

    it('Should transform model to read many response dto', function() {
      const readResponse: ReadStateResponseDTO = entity
      expect(modelMapper.fromModelToReadManyResponse([model])).toEqual([readResponse])
    })
  })
})
