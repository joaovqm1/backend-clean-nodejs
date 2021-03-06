import faker from 'faker'

import {
  CreateUserRequestViewModel, CreateUserResponseViewModel, ReadUserResponseViewModel, UserViewModelMapper, ReadUserRequestViewModel, UpdateUserRequestViewModel, UpdateUserResponseViewModel
} from '@/presentation'
import { CreateUserRequestDTO, CreateUserResponseDTO, Filter, ReadCrudRequestDTO, ReadUserResponseDTO, UpdateUserRequestDTO, UpdateUserResponseDTO, UserEntity, userFieldsToInclude } from '@/domain'
import { stringUtilities } from '@/main'
import { mockFiltersWithId } from '../mocks'

describe('User View Model Mapper', function() {
  const viewModelMapper = new UserViewModelMapper(stringUtilities)
  const userEntity: UserEntity = {
    id: 1,
    token: 'token',
    cpf: '11111111111',
    role: {
      id: faker.datatype.number()
    },
    email: faker.internet.email(),
    name: faker.name.findName(),
    username: faker.internet.userName()
  }

  describe('Create', function() {
    it('Should mapper request view model to request DTO', async function() {
      const requestViewModel: CreateUserRequestViewModel = {
        ...userEntity,
        cpf: '111.111.111.11',
        password: faker.internet.password()
      }

      const expectedRequestDTO: CreateUserRequestDTO = {
        ...requestViewModel,
        cpf: '11111111111',
        name: requestViewModel.name.toUpperCase()
      }

      const receivedRequestDTO = viewModelMapper.fromCreateRequestViewModelToCreateRequestDTO(requestViewModel)
      expect(expectedRequestDTO).toEqual(receivedRequestDTO)
    })

    it('Should mapper response DTO to response view model', async function() {
      const responseDTO: CreateUserResponseDTO = {
        ...userEntity
      }

      const expectedResponseViewModel: CreateUserResponseViewModel = {
        ...userEntity
      }

      const receivedCreateResponseViewModel = viewModelMapper.fromCreateResponseDTOToCreateResponseViewModel(responseDTO)
      expect(expectedResponseViewModel).toEqual(receivedCreateResponseViewModel)
    })
  })

  describe('Read', function() {
    it('Should mapper one response dto to one response view model', async function() {
      const responseDTO: ReadUserResponseDTO = userEntity
      const expectedResponseViewModel: ReadUserResponseViewModel = responseDTO

      const receivedResponseViewModel = viewModelMapper.fromReadOneResponseDTOToReadResponseOneViewModel(responseDTO)
      expect(expectedResponseViewModel).toEqual(receivedResponseViewModel)
    })

    it('Should mapper many response dto to many response view model', async function() {
      const responseDTO: ReadUserResponseDTO[] = [userEntity]
      const expectedResponseViewModel: ReadUserResponseViewModel[] = responseDTO

      const receivedResponseViewModel = viewModelMapper.fromReadManyResponseDTOToReadResponseOneViewModel(responseDTO)
      expect(expectedResponseViewModel).toEqual(receivedResponseViewModel)
    })

    it('Should mapper read request view model, with id, to read request dto', async function() {
      const requestViewModel: ReadUserRequestViewModel = {
        id: 1
      }

      const mockFilters: Filter[] = mockFiltersWithId.concat([{ name: 'include', fields: userFieldsToInclude }])

      expect(viewModelMapper.fromReadRequestViewModelToFilters(requestViewModel)).toEqual(mockFilters)
    })
  })

  describe('Update', function() {
    it('Should mapper request view model to request DTO', async function() {
      const requestViewModel: UpdateUserRequestViewModel = {
        ...userEntity,
        cpf: '111.111.111.11'
      }

      const expectedRequestDTO: UpdateUserRequestDTO = {
        ...requestViewModel,
        name: requestViewModel.name.toUpperCase(),
        cpf: '11111111111'
      }

      const receivedCreateRequestDTO = viewModelMapper.fromUpdateRequestViewModelToUpdateRequestDTO(requestViewModel)
      expect(expectedRequestDTO).toEqual(receivedCreateRequestDTO)
    })

    it('Should mapper response DTO to response view model', async function() {
      const responseDTO: UpdateUserResponseDTO = userEntity
      const expectedResponseViewModel: UpdateUserResponseViewModel = userEntity

      const receivedResponseViewModel = viewModelMapper.fromUpdateResponseDTOToUpdateResponseViewModel(responseDTO)
      expect(expectedResponseViewModel).toEqual(receivedResponseViewModel)
    })
  })
})
