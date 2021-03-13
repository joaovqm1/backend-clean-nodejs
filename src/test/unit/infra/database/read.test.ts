import {
  ReadApiImpl
} from '@/infra'
import { Filter } from '@/data/contracts'

import User from '@/infra/database/models/user'

import sinon from 'sinon'
import { QueryCreater } from '@/infra/database/api/read/query'

describe('Infra  - Database Read Api', () => {
  const queryCreater = new QueryCreater({
    modelName: undefined,
    sequelizeModel: undefined,
    sequelizeSchema: undefined,
    modelFactory: undefined,
    stringUtilities: undefined,
    currentUser: undefined,
    userId: undefined,
    isHybridTable: undefined,
    isPublicTable: undefined,
    officeIdFieldToQuery: undefined
  })

  const readImpl: ReadApiImpl = new ReadApiImpl({
    sequelizeModel: User,
    queryCreater
  })

  const filters: Filter[] = [{ name: 'nome' }]

  const json = {
    id: 1
  }

  const sequelizeObject = {
    toJSON: () => json
  }

  const query = {}

  it('Should call get one, transform response to json and return it', async function() {
    const filters = []

    sinon.stub(readImpl, 'getOne')
      .withArgs(filters)
      .resolves(sequelizeObject)

    expect(await readImpl.get(filters)).toEqual(json)
  })

  it('Should call function to create query, call findOne from sequelize model and return it', async function() {
    sinon.stub(queryCreater, 'create')
      .withArgs(filters)
      .returns(query)

    sinon.stub(User, 'findOne')
      .withArgs(query)
      .resolves(undefined)

    expect(await readImpl.getOne(filters)).toEqual(undefined)
  })

  it('Should call function to create query, call findMany from sequelize model and return it', async function() {
    const filters: Filter[] = [{
      name: 'name',
      field: 'field',
      value: 'value'
    }]

    const userModel = new User()

    sinon.stub(queryCreater, 'create')
      .withArgs(filters)
      .returns({})

    sinon.stub(User, 'findAll')
      .withArgs({})
      .resolves([userModel])

    sinon.stub(userModel, 'toJSON')
      .returns(userModel)

    expect(await readImpl.getMany(filters)).toEqual({ items: [userModel] })
  })

  it('Should call function to create query, call countAndFindMany from sequelize model and return result in pagination structure', async function() {
    const filters: Filter[] = [{
      name: 'name',
      field: 'field',
      value: 'value'
    }]
    const query = { limit: 10, offset: 0 }

    sinon.stub(queryCreater, 'create')
      .withArgs(filters)
      .returns(query)

    sinon.stub(User, 'findAndCountAll')
      .withArgs(query)
      .resolves({ count: 0, rows: [] })

    expect(await readImpl.getManyWithPagination(filters)).toEqual({ totalItems: 0, items: [], currentPage: 0, totalPages: 0 })
  })
})

afterEach(() => {
  sinon.restore()
})
