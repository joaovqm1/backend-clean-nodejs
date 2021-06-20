import { FinanceModel, FinanceModelMapper } from '@/data'
import { CreateFinanceRequestDTO, ReadFinanceResponseDTO, UpdateFinanceRequestDTO } from '@/domain'
import { objectUtilities } from '@/main'
import { mockFinanceEntity } from '@/test/utilities/mocks'

describe('Data - Finance Model Mapper', function() {
  const modelMapper = new FinanceModelMapper()

  const financeModel: FinanceModel = {
    ...mockFinanceEntity,
    customerSupplierId: mockFinanceEntity.customerSupplier.id,
    financeTypeId: mockFinanceEntity.financeType.id,
    financeMethodId: mockFinanceEntity.financeMethod.id,
  }

  describe('Create', function() {
    it('Should transform create request dto to model', function() {
      const createRequestDTO: CreateFinanceRequestDTO = objectUtilities.cloneObject(mockFinanceEntity)
      const modelCopy = objectUtilities.cloneObject(financeModel)
      delete modelCopy.customerSupplier
      delete modelCopy.financeType
      delete modelCopy.financeMethod

      expect(modelMapper.fromCreateRequestDTOToModel(createRequestDTO)).toEqual(modelCopy)
    })
  })

  describe('Read', function() {
    it('Should transform model to read one response dto', function() {
      const readResponse: ReadFinanceResponseDTO = mockFinanceEntity
      const modelCopy = objectUtilities.cloneObject(financeModel)
      delete modelCopy.customerSupplierId
      delete modelCopy.financeTypeId
      delete modelCopy.financeMethodId

      expect(modelMapper.fromModelToReadOneResponse(modelCopy)).toEqual(readResponse)
    })

    it('Should transform model to read many response dto', function() {
      const readResponse: ReadFinanceResponseDTO = objectUtilities.cloneObject(mockFinanceEntity)
      const modelCopy = objectUtilities.cloneObject(financeModel)
      delete modelCopy.customerSupplierId
      delete modelCopy.financeTypeId
      delete modelCopy.financeMethodId

      expect(modelMapper.fromModelToReadManyResponse([modelCopy])).toEqual([readResponse])
    })
  })

  describe('Update', function() {
    it('Should transform update request dto to model', function() {
      const updateRequestDTO: UpdateFinanceRequestDTO = objectUtilities.cloneObject(mockFinanceEntity)

      const modelCopy = objectUtilities.cloneObject(financeModel)
      delete modelCopy.customerSupplier
      delete modelCopy.financeType
      delete modelCopy.financeMethod

      expect(modelMapper.fromUpdateRequestDTOToModel(updateRequestDTO)).toStrictEqual(modelCopy)
    })
  })
})
