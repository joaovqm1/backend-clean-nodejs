import { FinanceTypeModelMapper, FinanceTypeModel } from '@/data'
import { CreateFinanceTypeRequestDTO, ReadFinanceTypeResponseDTO, UpdateFinanceTypeRequestDTO } from '@/domain'
import { mockFinanceTypeEntity } from '@/test/utilities/mocks'

describe('Data - FinanceType Model Mapper', function() {
  const modelMapper = new FinanceTypeModelMapper()

  const model: FinanceTypeModel = {
    ...mockFinanceTypeEntity
  }
  describe('Create', function() {
    it('Should transform create request dto to model', function() {
      const createRequestDTO: CreateFinanceTypeRequestDTO = mockFinanceTypeEntity
      expect(modelMapper.fromCreateRequestDTOToModel(createRequestDTO)).toEqual(model)
    })
  })

  describe('Read', function() {
    it('Should transform model to read one response dto', function() {
      const readResponse: ReadFinanceTypeResponseDTO = {
        ...mockFinanceTypeEntity
      }
      expect(modelMapper.fromModelToReadOneResponse(model)).toEqual(readResponse)
    })

    it('Should transform model to read many response dto', function() {
      const readResponse: ReadFinanceTypeResponseDTO = {
        ...mockFinanceTypeEntity
      }
      expect(modelMapper.fromModelToReadManyResponse([model])).toEqual([readResponse])
    })
  })

  describe('Update', function() {
    it('Should transform update request dto to model', function() {
      const updateRequestDTO: UpdateFinanceTypeRequestDTO = mockFinanceTypeEntity
      expect(modelMapper.fromUpdateRequestDTOToModel(updateRequestDTO)).toEqual(model)
    })
  })
})
