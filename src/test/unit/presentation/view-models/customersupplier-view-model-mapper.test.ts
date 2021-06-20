import {
  CreateCustomerSupplierRequestViewModel,
  CreateCustomerSupplierResponseViewModel,
  CustomerSupplierViewModelMapper,
  UpdateCustomerSupplierRequestViewModel,
  UpdateCustomerSupplierResponseViewModel,
  ReadCustomerSupplierRequestViewModel,
  ReadCustomerSupplierResponseViewModel
} from '@/presentation/features/customer-supplier'
import { stringUtilities } from '@/main'
import { CreateCustomerSupplierRequestDTO, CustomerSupplierClass, customerSupplierFieldsToInclude, CustomerSupplierProfile, CustomerSupplierType, Filter, ReadCrudRequestDTO, ReadCustomerSupplierResponseDTO, UpdateCustomerSupplierRequestDTO } from '@/domain'
import { mockFiltersWithId } from '../mocks'

describe('CustomerSupplier View Model Mapper', function() {
  const viewModelMapper = new CustomerSupplierViewModelMapper({
    stringUtilities,
    class: CustomerSupplierClass.CUSTOMER
  })

  const createUpdateRequestDTO: CreateCustomerSupplierRequestDTO = {
    name: 'JOSE DA SILVA',
    class: CustomerSupplierClass.CUSTOMER,
    profile: CustomerSupplierProfile.CUSTUMERSUPPLIER,
    tradingName: 'TRANDING NAME',
    email: 'email@dominion.com',
    type: CustomerSupplierType.PHYSICAL,
    identityCard: '25.456.789',
    phone1: '(31)3551-1111',
    phone2: '(31)3551-1111',
    cellphone1: '(31)99877-9999',
    cellphone2: '(31)99877-9999',
    birthdate: '28/01/99',
    cpfCnpj: '528.897.976-50',
    address1: 'RUA TESTE',
    address2: 'RUA TESTE2',
    postcode: '35400000',
    addressReference: 'REFERENCIA ENDEREÇO',
    state: {
      id: 1,
      name: 'MINAS GERAIS'
    },
    city: {
      id: 1,
      name: 'OURO PRETO'
    },
    bank: {
      id: 1,
      name: 'OURO PRETO'

    },
    neighborhood: 'BAUXITA',
    addressNumber: '123',
    additionalInfo: 'INFO ADICIONAL',
    addressComplement: '123',
    bankAccount: 'INFO ADICIONAL',
    bankBranch: '123',
  }

  const responsetDTO: ReadCustomerSupplierResponseDTO = {
    ...createUpdateRequestDTO,
    id: 1,
    cellphone1: '31998779999',
    cellphone2: '31998779999',
    cpfCnpj: '52889797650',
    identityCard: '25456789',
    phone1: '3135511111',
    phone2: '3135511111'

  }

  describe('Create', function() {
    it('Should transform request view model to request dto', function() {
      const requestViewModel: CreateCustomerSupplierRequestViewModel = createUpdateRequestDTO
      expect(viewModelMapper.fromCreateRequestViewModelToCreateRequestDTO(requestViewModel)).toEqual({
        ...responsetDTO,
        id: undefined
      } as CreateCustomerSupplierRequestDTO)
    })

    it('Should transform response dto to response view model', function() {
      const responseViewModel: CreateCustomerSupplierResponseViewModel = responsetDTO
      expect(viewModelMapper.fromCreateResponseDTOToCreateResponseViewModel(responsetDTO as ReadCustomerSupplierResponseDTO)).toEqual(responseViewModel)
    })
  })

  describe('Update', function() {
    it('Should transform request view model to request dto', function() {
      const requestViewModel: UpdateCustomerSupplierRequestViewModel = {
        id: 1,
        ...createUpdateRequestDTO
      }
      expect(viewModelMapper.fromUpdateRequestViewModelToUpdateRequestDTO(requestViewModel)).toEqual(responsetDTO as UpdateCustomerSupplierRequestDTO)
    })

    it('Should transform response dto to response view model', function() {
      const responseViewModel: UpdateCustomerSupplierResponseViewModel = responsetDTO
      expect(viewModelMapper.fromUpdateResponseDTOToUpdateResponseViewModel(responsetDTO as ReadCustomerSupplierResponseDTO)).toEqual(responseViewModel)
    })
  })

  describe('Read', function() {
    it('Should transform read request view model to read request dto', function() {
      const requestViewModel: ReadCustomerSupplierRequestViewModel = {
        id: 1
      }

      const mockFilters: Filter[] = mockFiltersWithId.concat([{ name: 'include', fields: customerSupplierFieldsToInclude }])

      expect(viewModelMapper.fromReadRequestViewModelToFilters(requestViewModel)).toEqual(mockFilters)
    })

    it('Should transform read response dto to read response view model', async function() {
      const readResponseViewModel: ReadCustomerSupplierResponseViewModel[] = [responsetDTO]
      expect(viewModelMapper.fromReadManyResponseDTOToReadResponseOneViewModel([responsetDTO] as ReadCustomerSupplierResponseDTO[])).toEqual(readResponseViewModel)
    })
  })

  it('Should should return default profile', function() {
    // Arrange

    // Act
    const receivedProfile = viewModelMapper.getProfile()

    // Assert
    const expectedProfile = CustomerSupplierProfile.CUSTUMERSUPPLIER
  })
})
