import { CustomerSupplierModelMapper, CustomerSupplierModel } from '@/data'
import { CreateCustomerSupplierRequestDTO, UpdateCustomerSupplierRequestDTO } from '@/domain'
import { objectUtilities, stringUtilities, typeUtilities } from '@/main'
import { mockCustomerSupplierEntity as entity } from '@/test/utilities/mocks'

describe('Data - CustomerSupplier Model Mapper', function() {
  const modelMapper = new CustomerSupplierModelMapper({
    stringUtilities,
    typeUtilities
  })

  const modelCustomerSupplier: CustomerSupplierModel = {
    ...entity,
    stateId: entity.city.id,
    cityId: entity.state.id,
    bankId: entity.bank.id

  }

  delete modelCustomerSupplier.state
  delete modelCustomerSupplier.city
  delete modelCustomerSupplier.bank

  describe('Create', function() {
    it('Should transform create request dto to model', function() {
      const createRequestDTO: CreateCustomerSupplierRequestDTO = entity
      expect(modelMapper.fromCreateRequestDTOToModel(createRequestDTO)).toEqual(modelCustomerSupplier)
    })
  })

  describe('Read', function() {
    const modelCopy = objectUtilities.cloneObject(modelCustomerSupplier)
    delete modelCopy.state
    delete modelCopy.city
    delete modelCopy.bank

    it('Should transform model to read one response dto', function() {
      expect(modelMapper.fromModelToReadOneResponse(modelCustomerSupplier)).toEqual(modelCopy)
    })

    it('Should transform model to read many response dto', function() {
      expect(modelMapper.fromModelToReadManyResponse([modelCustomerSupplier])).toEqual([modelCopy])
    })
  })

  describe('Update', function() {
    const entityCopy = objectUtilities.cloneObject(entity)

    it('Should transform update request dto to model', function() {
      const updateRequestDTO: UpdateCustomerSupplierRequestDTO = entityCopy
      expect(modelMapper.fromUpdateRequestDTOToModel(updateRequestDTO)).toEqual(modelCustomerSupplier)

    })

  })
})
