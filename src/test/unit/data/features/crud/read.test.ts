import sinon from 'sinon'

import { UserEntity, ReadCrudRequestDTO } from '@/domain'
import { UserModelMapper, ReadCrudUseCaseImpl, Filter } from '@/data'
import { ReadCrudRepositoryImpl } from '@/infra'
import { FilterTransformerImpl } from '@/utilities'

afterEach(function() {
  sinon.restore()
})

describe('Data - Read CRUD Use Case', function() {
  const readRepository = new ReadCrudRepositoryImpl(undefined)
  const filterTransformer = new FilterTransformerImpl()
  const userMapper = new UserModelMapper(undefined)

  const readUserCrudUseCase = new ReadCrudUseCaseImpl<UserEntity>({
    repository: readRepository,
    filterTransformer,
    modelMapper: userMapper
  })

  it('Should return new object when passed a valid request to get it', async function() {
    const query: ReadCrudRequestDTO = {
      fieldsToSelect: ['id']
    }
    const filters: Filter[] = [{ name: 'filter', fields: query.fieldsToSelect }]
    const objectReturn = {
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

    sinon.stub(filterTransformer, 'transformQueryToFilters')
      .withArgs(query)
      .returns(filters)

    sinon.stub(readRepository, 'getOne')
      .withArgs(filters)
      .resolves(objectReturn)

    sinon.stub(userMapper, 'fromModelToReadOneResponse')
      .withArgs(objectReturn)
      .returns(objectReturn)

    expect(await readUserCrudUseCase.getOne(query)).toEqual(objectReturn)
  })

  it('Should throw error when try to get object not found', async function() {
    const query: ReadCrudRequestDTO = {
      fieldsToSelect: ['id']
    }
    const filters: Filter[] = [{ name: 'filter', fields: query.fieldsToSelect }]

    sinon.stub(filterTransformer, 'transformQueryToFilters')
      .withArgs(query)
      .returns(filters)

    sinon.stub(readRepository, 'getOne')
      .withArgs(filters)
      .resolves(false)

    await expect(async function() { await readUserCrudUseCase.getOne(query) })
      .rejects
      .toThrow('Objeto não encontrado')
  })

  it('Should return many object when passed a valid query to get them', async function() {
    const query: ReadCrudRequestDTO = {
      fieldsToSelect: ['id']
    }
    const filters: Filter[] = [{ name: 'filter', fields: query.fieldsToSelect }]
    const objectReturn = [{
      id: 1,
      token: 'token',
      officeId: 1,
      cpf: '11111111111',
      role: { id: 9 },
      name: 'user',
      email: 'user@email.com',
      username: 'dev',
      roleId: 9
    }]

    sinon.stub(filterTransformer, 'transformQueryToFilters')
      .withArgs(query)
      .returns(filters)

    sinon.stub(readRepository, 'getMany')
      .withArgs(filters)
      .resolves({
        items: objectReturn
      })

    sinon.stub(userMapper, 'fromModelToReadManyResponse')
      .withArgs(objectReturn)
      .returns(objectReturn)

    expect(await readUserCrudUseCase.getMany(query)).toEqual({
      items: objectReturn
    })
  })
})

afterEach(() => sinon.restore())
