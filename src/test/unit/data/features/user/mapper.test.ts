import sinon from 'sinon'

import {
  ReadUserResponseDTO,
  UpdateUserRequestDTO,
  CreateUserRequestDTO,
  CreateUserForOfficeRequestDTO
} from '@/domain'
import {
  UserModel,
  UserModelMapper,
  Roles
} from '@/data'
import { StringUtilitiesImpl } from '@/utilities'

afterEach(function() {
  sinon.restore()
})

describe('Data - Login/User Mapper', function() {
  const stringUtilities = new StringUtilitiesImpl()
  const userMapper = new UserModelMapper(stringUtilities)

  it('Should return model when pass a request', function() {
    const request: CreateUserRequestDTO = {
      role: { id: 9 },
      cpf: '11111111111',
      name: 'user',
      email: 'user@email.com',
      username: 'dev',
      password: 'dev'
    }

    const model: Omit<UserModel, 'id' | 'token' | 'officeId'> = {
      ...request,
      roleId: 9,
      role: undefined
    }

    expect(userMapper.fromCreateRequestDTOToModel(request)).toEqual(model)
  })

  it('Should return create user request when is passed a create user for office request', function() {
    const request: CreateUserForOfficeRequestDTO = {
      officeId: 1,
      name: 'user',
      cpf: '11111111111',
      email: 'user@email.com',
      username: 'dev',
      password: 'dev'
    }

    const createUserRequest: CreateUserRequestDTO = {
      ...request,
      role: { id: 2 },
      token: 'random string'
    }

    sinon.stub(stringUtilities, 'getRandomString')
      .withArgs()
      .returns('random string')

    expect(userMapper.fromCreateUserForOfficeRequestToCreateUserRequest(request)).toEqual(createUserRequest)
  })

  it('Should return model when is passed a update request', function() {
    const request: UpdateUserRequestDTO = {
      id: 1,
      role: { id: 9 },
      cpf: '11111111111',
      name: 'user',
      email: 'user@email.com',
      username: 'dev'
    }

    const model: Omit<UserModel, 'officeId' | 'token'> = {
      ...request,
      roleId: request.role.id,
      role: undefined
    }

    expect(userMapper.fromUpdateRequestDTOToModel(request)).toEqual(model)
  })

  it('Should return read one user response when is passed a user model with admin permission', function() {
    const model: UserModel = {
      id: 1,
      token: 'token',
      officeId: 1,
      cpf: '11111111111',
      roleId: 1,
      role: {
        id: 1,
        name: Roles.ADMIN
      },
      name: 'user',
      email: 'user@email.com',
      username: 'dev'
    }

    const response: ReadUserResponseDTO = {
      ...model,
      id: model.id,
      role: {
        id: model.roleId,
        name: Roles.ADMIN
      }
    }

    expect(userMapper.fromModelToReadOneResponse(model)).toEqual(response)
  })
})

afterEach(() => sinon.restore())
