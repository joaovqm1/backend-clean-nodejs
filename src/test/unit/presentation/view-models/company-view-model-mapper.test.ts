import {
  CreateOfficeRequestViewModel,
  CreateOfficeResponseViewModel,
  OfficeViewModelMapper,
  ReadOfficeResponseViewModel,
  ReadOfficeRequestViewModel,
  UpdateOfficeRequestViewModel,
  UpdateOfficeResponseViewModel
} from '@/presentation/features/office'
import { objectUtilities, stringUtilities } from '@/main'
import { CreateOfficeRequestDTO, ReadCrudRequestDTO, ReadOfficeResponseDTO, UpdateOfficeRequestDTO } from '@/domain'
import { officeEntity as entity, userEntity } from '@/test/utilities/mocks'

describe('Presentation - Office View Model Mapper', function() {
  const viewModelMapper = new OfficeViewModelMapper(stringUtilities)

  const entityCopy = objectUtilities.cloneObject(entity)
  delete entityCopy.id

  const createUpdateRequestViewModel: CreateOfficeRequestViewModel | UpdateOfficeRequestViewModel = {
    ...entityCopy,
    user: {
      username: 'username',
      password: 'password'
    }
  }

  const responseDTO: ReadOfficeResponseDTO = entity

  describe('Create', function() {
    it('Should transform request view model to request dto', function() {
      const requestViewModel: CreateOfficeRequestViewModel = {
        ...createUpdateRequestViewModel,
        name: 'Office name',
        tradingName: 'My Office',
        owner: 'Office Owner',
        cnpj: '26.359.698.0001/20',
        cpf: '578.247.870.52',
        cellphone: '(31)989999-9999'
      }
      const requestDTO: CreateOfficeRequestDTO = createUpdateRequestViewModel
      expect(viewModelMapper.fromCreateRequestViewModelToCreateRequestDTO(requestViewModel)).toEqual(requestDTO)
    })

    it('Should transform response dto to response view model', function() {
      const responseViewModel: CreateOfficeResponseViewModel = {
        ...responseDTO,
        user: userEntity
      }
      expect(viewModelMapper.fromCreateResponseDTOToCreateResponseViewModel({ ...responseDTO, user: userEntity })).toEqual(responseViewModel)
    })
  })

  describe('Update', function() {
    it('Should transform request view model to request dto', function() {
      const requestViewModel: UpdateOfficeRequestViewModel = {
        ...createUpdateRequestViewModel,
        id: 1,
        name: 'Office name',
        tradingName: 'My Office',
        owner: 'Office Owner',
        cnpj: '26.359.698.0001/20',
        cpf: '578.247.870.52',
        cellphone: '(31)989999-9999'
      }
      const requestDTO: UpdateOfficeRequestDTO = {
        ...createUpdateRequestViewModel,
        id: 1
      }
      expect(viewModelMapper.fromUpdateRequestViewModelToUpdateRequestDTO(requestViewModel)).toEqual(requestDTO)
    })

    it('Should transform responset dto to response view model', function() {
      const responseViewModel: UpdateOfficeResponseViewModel = responseDTO
      expect(viewModelMapper.fromUpdateResponseDTOToUpdateResponseViewModel(responseDTO)).toEqual(responseViewModel)
    })
  })

  describe('Read', function() {
    it('Should transform read request view model to read request dto', function() {
      const requestViewModel: ReadOfficeRequestViewModel = {
        id: 1
      }

      const requestDTO: ReadCrudRequestDTO = {
        filters: [{
          equalTo: {
            id: requestViewModel.id
          }
        }]
      }

      expect(viewModelMapper.fromReadRequestViewModelToReadRequestDTO(requestViewModel)).toEqual(requestDTO)
    })

    it('Should transform read one response dto to read one response view model', async function() {
      const readResponseViewModel: ReadOfficeResponseViewModel = responseDTO
      expect(viewModelMapper.fromReadOneResponseDTOToReadResponseOneViewModel(responseDTO)).toEqual(readResponseViewModel)
    })

    it('Should transform read many response dto to read many response view model', async function() {
      const readResponseViewModel: ReadOfficeResponseViewModel[] = [responseDTO]
      expect(viewModelMapper.fromReadManyResponseDTOToReadResponseOneViewModel(readResponseViewModel)).toEqual(readResponseViewModel)
    })
  })
})
