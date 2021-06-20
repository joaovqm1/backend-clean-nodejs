import { ScopeModelMapper, ScopeModel } from '@/data'
import { CreateScopeRequestDTO, ReadScopeResponseDTO, UpdateScopeRequestDTO } from '@/domain'
import { mockScopeEntity } from '@/test/utilities/mocks'

describe('Data - Scope Model Mapper', function() {
  const modelMapper = new ScopeModelMapper()

  const model: ScopeModel = {
    ...mockScopeEntity
  }
  describe('Create', function() {
    it('Should transform create request dto to model', function() {
      const createRequestDTO: CreateScopeRequestDTO = mockScopeEntity
      expect(modelMapper.fromCreateRequestDTOToModel(createRequestDTO)).toEqual(model)
    })
  })

  describe('Read', function() {
    it('Should transform model to read one response dto', function() {
      const readResponse: ReadScopeResponseDTO = {
        ...mockScopeEntity
      }
      expect(modelMapper.fromModelToReadOneResponse(model)).toEqual(readResponse)
    })

    it('Should transform model to read many response dto', function() {
      const readResponse: ReadScopeResponseDTO = {
        ...mockScopeEntity
      }
      expect(modelMapper.fromModelToReadManyResponse([model])).toEqual([readResponse])
    })
  })

  describe('Update', function() {
    it('Should transform update request dto to model', function() {
      const updateRequestDTO: UpdateScopeRequestDTO = mockScopeEntity
      expect(modelMapper.fromUpdateRequestDTOToModel(updateRequestDTO)).toEqual(model)
    })
  })
})
