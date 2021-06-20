import { BankModelMapper, BankModel } from '@/data'
import { CreateBankRequestDTO, ReadBankResponseDTO, UpdateBankRequestDTO } from '@/domain'
import { mockBankEntity } from '@/test/utilities/mocks'

describe('Data - Bank Model Mapper', function() {
  const modelMapper = new BankModelMapper()

  const model: BankModel = {
    ...mockBankEntity
  }
  describe('Create', function() {
    it('Should transform create request dto to model', function() {
      const createRequestDTO: CreateBankRequestDTO = mockBankEntity
      expect(modelMapper.fromCreateRequestDTOToModel(createRequestDTO)).toEqual(model)
    })
  })

  describe('Read', function() {
    it('Should transform model to read one response dto', function() {
      const readResponse: ReadBankResponseDTO = {
        ...mockBankEntity
      }
      expect(modelMapper.fromModelToReadOneResponse(model)).toEqual(readResponse)
    })

    it('Should transform model to read many response dto', function() {
      const readResponse: ReadBankResponseDTO = {
        ...mockBankEntity
      }
      expect(modelMapper.fromModelToReadManyResponse([model])).toEqual([readResponse])
    })
  })

  describe('Update', function() {
    it('Should transform update request dto to model', function() {
      const updateRequestDTO: UpdateBankRequestDTO = mockBankEntity
      expect(modelMapper.fromUpdateRequestDTOToModel(updateRequestDTO)).toEqual(model)
    })
  })
})
