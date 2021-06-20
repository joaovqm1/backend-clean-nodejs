import sinon from 'sinon'
import faker from 'faker'

import { ReadCrudRequestDTO, Filter } from '@/domain'
import { ReadCrudUseCaseImpl, FilterBuilder, BaseModelMapper, ReadCrudRepository } from '@/data'
import { mockFiltersWithId } from '@/test/unit/presentation/mocks'

afterEach(function() {
  sinon.restore()
})

describe('Read CRUD Use Case', function() {
  const mockRepoistory: ReadCrudRepository = {
    getMany: jest.fn(),
    getOne: jest.fn()
  }

  const mockMapper: BaseModelMapper = {
    fromModelToReadManyResponse: jest.fn(),
    fromModelToReadOneResponse: jest.fn(),
    fromCreateRequestDTOToModel: jest.fn(),
    fromUpdateRequestDTOToModel: jest.fn(),
  }

  const mockDefaultGetManyFilters = mockFiltersWithId

  const readUserCrudUseCase = new ReadCrudUseCaseImpl<any>({
    repository: mockRepoistory,
    modelMapper: mockMapper,
    defaultGetManyFilters: mockDefaultGetManyFilters
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

    sinon.stub(mockRepoistory, 'getOne')
      .withArgs(filters)
      .resolves(objectReturn)

    sinon.stub(mockMapper, 'fromModelToReadOneResponse')
      .withArgs(objectReturn)
      .returns(objectReturn)

    expect(await readUserCrudUseCase.getOne(filters)).toEqual(objectReturn)
  })

  it('Should return undefined when object doesnt exist', async function() {
    const query: ReadCrudRequestDTO = {
      fieldsToSelect: ['id']
    }
    const filters: Filter[] = [{ name: 'filter', fields: query.fieldsToSelect }]

    sinon.stub(mockRepoistory, 'getOne')
      .withArgs(filters)
      .resolves(undefined)

    expect(await readUserCrudUseCase.getOne(filters)).toEqual(undefined)
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

    sinon.stub(mockRepoistory, 'getMany')
      .withArgs(filters.concat(mockDefaultGetManyFilters))
      .resolves({
        items: objectReturn
      })

    sinon.stub(mockMapper, 'fromModelToReadManyResponse')
      .withArgs(objectReturn)
      .returns(objectReturn)

    expect(await readUserCrudUseCase.getMany(filters)).toEqual({
      items: objectReturn
    })
  })

  it('Should return object found by id', async function() {
    // Arrange 
    const mockId = faker.datatype.number()
    const mockFilters = new FilterBuilder()
      .equalTo('id', mockId)
      .build()

    const mockObject = {
      id: mockId
    }

    sinon.stub(readUserCrudUseCase, 'getOne')
      .withArgs(mockFilters)
      .resolves(mockObject)

    expect(await readUserCrudUseCase.getById(mockId)).toEqual(mockObject)
  })
})

afterEach(() => sinon.restore())
