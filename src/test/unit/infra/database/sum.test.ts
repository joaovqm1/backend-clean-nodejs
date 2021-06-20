import { SumCrudRepositoryRequest } from '@/data'
import {
  QueryCreater,
  SumApiImpl
} from '@/infra'
import faker from 'faker'
import sinon from 'sinon'

describe('Database Sum Api', () => {
  const mockQueryCreater: QueryCreater = {
    create: jest.fn()
  }

  const mockSequelizeModel = {
    sum: jest.fn()
  }

  const apiImpl = new SumApiImpl({
    sequelizeModel: mockSequelizeModel,
    queryCreater: mockQueryCreater
  })

  it('Should return the sum', async function() {
    const mockQuery = faker.random.objectElement()

    const mockRequest: SumCrudRepositoryRequest = {
      field: faker.database.column()
    }

    sinon.stub(mockQueryCreater, 'create').withArgs([]).resolves(mockQuery)

    const mockSum = faker.datatype.number()

    sinon.stub(mockSequelizeModel, 'sum').withArgs(mockRequest.field, mockQuery).resolves(mockSum)

    const receivedSum = await apiImpl.sum(mockRequest)

    const expectedSum = mockSum
    expect(receivedSum).toEqual(expectedSum)
  })
})

afterEach(() => {
  sinon.restore()
})
