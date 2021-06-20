import sinon from 'sinon'
import { omit } from 'lodash'

import { AfterUpdateCrudUseCase, Filter, UpdateUserRequestDTO } from '@/domain'
import {
  UserModel,
  UserModelMapper,
  UpdateCrudUseCaseImpl,
  FilterBuilder
} from '@/data'
import { UpdateCrudRepositoryImpl } from '@/infra'
import { mockUserEntity } from '@/test/utilities/mocks'

afterEach(function() {
  sinon.restore()
})

describe('Data - Update CRUD Use Case', function() {
  const updateCrudRepository = new UpdateCrudRepositoryImpl(undefined, undefined)
  const userMapper = new UserModelMapper(undefined)
  const mockAfterUpdate: AfterUpdateCrudUseCase<any> = {
    fetchAfterUpdate: jest.fn()
  }
  const updateCrudUseCase = new UpdateCrudUseCaseImpl({
    repository: updateCrudRepository,
    modelMapper: userMapper,
    afterUpdateCrudUseCase: mockAfterUpdate
  })

  it('Should return object updated when passed a valid request', async function() {
    const requestId = 1
    const objectModel: UserModel = {
      id: 1,
      token: 'token',
      officeId: 1,
      cpf: '11111111111',
      role: { id: 9 },
      name: 'user',
      email: 'user@email.com',
      username: 'dev',
      roleId: 9
    }
    const requestUpdate: UpdateUserRequestDTO = omit(mockUserEntity, 'token')

    sinon.stub(updateCrudUseCase, 'verifyCurrentObject')
      .withArgs(requestId)
      .resolves()

    sinon.stub(userMapper, 'fromUpdateRequestDTOToModel')
      .withArgs(requestUpdate)
      .returns(objectModel)

    sinon.stub(updateCrudRepository, 'update')
      .withArgs(objectModel)
      .resolves(mockUserEntity)

    sinon.stub(mockAfterUpdate, 'fetchAfterUpdate')
      .withArgs(mockUserEntity.id)
      .resolves(mockUserEntity)

    expect(await updateCrudUseCase.update(requestUpdate)).toEqual(mockUserEntity)
  })

  it('Should throw error when not is possible find object', async function() {
    const requestId = 1
    const filters = new FilterBuilder().equalTo('id', requestId).build()

    sinon.stub(updateCrudRepository, 'get')
      .withArgs(filters)
      .resolves(undefined)

    await expect(async function() { await updateCrudUseCase.verifyCurrentObject(requestId) })
      .rejects
      .toThrow('Não foi possível encontrar o objeto que será atualizado')
  })

  it('Should not throw error when object was found', async function() {
    const requestId = 1
    const filters = new FilterBuilder().equalTo('id', requestId).build()

    sinon.stub(updateCrudRepository, 'get')
      .withArgs(filters)
      .resolves({})

    await updateCrudUseCase.verifyCurrentObject(requestId)
  })
})

afterEach(() => sinon.restore())
