import sinon from 'sinon'
import { omit } from 'lodash'

import { UpdateUserRequestDTO } from '@/domain'
import {
  UserModel,
  Filter,
  UserModelMapper,
  ReadUserUseCaseImpl,
  UpdateCrudUseCaseImpl
} from '@/data'
import { UpdateCrudRepositoryImpl } from '@/infra'
import { userEntity } from '@/test/utilities/mocks'

afterEach(function() {
  sinon.restore()
})

describe('Data - Update CRUD Use Case', function() {
  const updateCrudRepository = new UpdateCrudRepositoryImpl(undefined, undefined)
  const userMapper = new UserModelMapper(undefined)
  const readUserUseCase = new ReadUserUseCaseImpl({
    readCrudUseCase: undefined
  })

  const updateCrudUseCase = new UpdateCrudUseCaseImpl({
    repository: updateCrudRepository,
    modelMapper: userMapper,
    afterUpdateCrudUseCase: readUserUseCase
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
    const requestUpdate: UpdateUserRequestDTO = omit(userEntity, 'token')

    sinon.stub(updateCrudUseCase, 'verifyCurrentObject')
      .withArgs(requestId)
      .resolves()

    sinon.stub(userMapper, 'fromUpdateRequestDTOToModel')
      .withArgs(requestUpdate)
      .returns(objectModel)

    sinon.stub(updateCrudRepository, 'update')
      .withArgs(objectModel)
      .resolves(userEntity)

    sinon.stub(readUserUseCase, 'fetchAfterUpdate')
      .withArgs(userEntity.id)
      .resolves(userEntity)

    expect(await updateCrudUseCase.update(requestUpdate)).toEqual(userEntity)
  })

  it('Should throw error when not is possible find object', async function() {
    const requestId = 1
    const filters: Filter[] = [{ name: 'filter', fields: ['id'] }]

    sinon.stub(updateCrudRepository, 'get')
      .withArgs(filters)
      .resolves(false)

    await expect(async function() { await updateCrudUseCase.verifyCurrentObject(requestId) })
      .rejects
      .toThrow('Não foi possível encontrar o objeto que será atualizado')
  })
})

afterEach(() => sinon.restore())
