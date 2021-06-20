import { PhasesModelMapper, PhasesModel } from '@/data'
import { CreatePhasesRequestDTO, ReadPhaseResponseDTO, UpdatePhasesRequestDTO } from '@/domain'
import { mockPhaseEntity } from '@/test/utilities/mocks'

describe('Data - Phases Model Mapper', function() {
  const modelMapper = new PhasesModelMapper()

  const model: PhasesModel = {
    ...mockPhaseEntity
  }
  describe('Create', function() {
    it('Should transform create request dto to model', function() {
      const createRequestDTO: CreatePhasesRequestDTO = mockPhaseEntity
      expect(modelMapper.fromCreateRequestDTOToModel(createRequestDTO)).toEqual(model)
    })
  })

  describe('Read', function() {
    it('Should transform model to read one response dto', function() {
      const readResponse: ReadPhaseResponseDTO = {
        ...mockPhaseEntity
      }
      expect(modelMapper.fromModelToReadOneResponse(model)).toEqual(readResponse)
    })

    it('Should transform model to read many response dto', function() {
      const readResponse: ReadPhaseResponseDTO = {
        ...mockPhaseEntity
      }
      expect(modelMapper.fromModelToReadManyResponse([model])).toEqual([readResponse])
    })
  })

  describe('Update', function() {
    it('Should transform update request dto to model', function() {
      const updateRequestDTO: UpdatePhasesRequestDTO = mockPhaseEntity
      expect(modelMapper.fromUpdateRequestDTOToModel(updateRequestDTO)).toEqual(model)
    })
  })
})
