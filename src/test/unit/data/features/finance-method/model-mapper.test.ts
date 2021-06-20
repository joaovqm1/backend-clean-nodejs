import { FinanceMethodModelMapper, FinanceMethodModel } from '@/data'
import { CreateFinanceMethodRequestDTO, ReadFinanceMethodResponseDTO, UpdateFinanceMethodRequestDTO } from '@/domain'
import { mockFinanceMethodEntity } from '@/test/utilities/mocks'

describe('Data - FinanceMethod Model Mapper', function() {
  const modelMapper = new FinanceMethodModelMapper()

  const model: FinanceMethodModel = {
    ...mockFinanceMethodEntity
  }
  describe('Create', function() {
    it('Should transform create request dto to model', function() {
      const createRequestDTO: CreateFinanceMethodRequestDTO = mockFinanceMethodEntity
      expect(modelMapper.fromCreateRequestDTOToModel(createRequestDTO)).toEqual(model)
    })
  })

  describe('Read', function() {
    it('Should transform model to read one response dto', function() {
      const readResponse: ReadFinanceMethodResponseDTO = {
        ...mockFinanceMethodEntity
      }
      expect(modelMapper.fromModelToReadOneResponse(model)).toEqual(readResponse)
    })

    it('Should transform model to read many response dto', function() {
      const readResponse: ReadFinanceMethodResponseDTO = {
        ...mockFinanceMethodEntity
      }
      expect(modelMapper.fromModelToReadManyResponse([model])).toEqual([readResponse])
    })
  })

  describe('Update', function() {
    it('Should transform update request dto to model', function() {
      const updateRequestDTO: UpdateFinanceMethodRequestDTO = mockFinanceMethodEntity
      expect(modelMapper.fromUpdateRequestDTOToModel(updateRequestDTO)).toEqual(model)
    })
  })
})
