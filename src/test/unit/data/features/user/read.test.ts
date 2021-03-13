import sinon from 'sinon'

import {
  ReadCrudRequestDTO,
  ReadUserResponseDTO,
  UserEntity
} from '@/domain'
import { ReadCrudUseCaseImpl, ReadUserUseCaseImpl } from '@/data'
import { userEntity } from '@/test/utilities/mocks'

afterEach(function() {
  sinon.restore()
})

describe('Data - Read User Use Case', function() {
  const readUserCrudUseCase = new ReadCrudUseCaseImpl<UserEntity>({
    repository: undefined,
    filterTransformer: undefined,
    modelMapper: undefined
  })

  const readUserUseCase = new ReadUserUseCaseImpl({
    readCrudUseCase: readUserCrudUseCase
  })

  it('Should return request including fields and filters default', function() {
    const id = 1
    const filtersToInclude = ['role.id', 'role.name', 'role.alias']

    const requestReturn: ReadCrudRequestDTO = {
      filters: [{
        equalTo: { id: id }
      }],
      fieldsToInclude: filtersToInclude
    }

    expect(readUserUseCase.getRequestByIdWithIncludes(id)).toEqual(requestReturn)
  })

  it('Should return user found by id', async function() {
    const request: ReadCrudRequestDTO = {}

    const id = 1

    sinon.stub(readUserUseCase, 'getRequestByIdWithIncludes').withArgs(id).returns(request)
    sinon.stub(readUserCrudUseCase, 'getOne').withArgs(request).resolves(userEntity)

    expect(await readUserUseCase.getById(id)).toEqual(userEntity)
  })

  it('Should return user fetched after your creation', async function() {
    const id = 1
    const requestReturn: ReadCrudRequestDTO = {
      filters: [{
        equalTo: { id: id }
      }],
      fieldsToInclude: ['state.id']
    }

    const readUserResponseDTO: ReadUserResponseDTO = {
      id: 1,
      token: '1233',
      role: { id: 9 },
      cpf: '11111111111',
      name: 'user',
      email: 'user@email.com',
      username: 'dev'
    }

    sinon.stub(readUserUseCase, 'getRequestByIdWithIncludes')
      .withArgs(id)
      .returns(requestReturn)

    sinon.stub(readUserCrudUseCase, 'getOne')
      .withArgs(requestReturn)
      .resolves(readUserResponseDTO)

    sinon.stub(readUserUseCase, 'getById')
      .withArgs(id)
      .resolves(readUserResponseDTO)

    expect(await readUserUseCase.fetchAfterCreation(id)).toEqual(readUserResponseDTO)
  })

  it('Should return user fetched after update it', async function() {
    const id = 1
    const requestReturn: ReadCrudRequestDTO = {
      filters: [{
        equalTo: { id: id }
      }],
      fieldsToInclude: ['state.id']
    }
    const readUserResponseDTO: ReadUserResponseDTO = {
      id: 1,
      token: '1233',
      role: { id: 9 },
      cpf: '11111111111',
      name: 'user',
      email: 'user@email.com',
      username: 'dev'
    }

    sinon.stub(readUserUseCase, 'getRequestByIdWithIncludes')
      .withArgs(id)
      .returns(requestReturn)

    sinon.stub(readUserCrudUseCase, 'getOne')
      .withArgs(requestReturn)
      .resolves(readUserResponseDTO)

    sinon.stub(readUserUseCase, 'getById')
      .withArgs(id)
      .resolves(readUserResponseDTO)

    expect(await readUserUseCase.fetchAfterUpdate(id)).toEqual(readUserResponseDTO)
  })
})

afterEach(() => sinon.restore())
