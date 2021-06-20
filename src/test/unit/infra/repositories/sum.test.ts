import faker from 'faker'
import sinon from 'sinon'

import {
  SumApi,
  SumCrudRepositoryImpl
} from '@/infra'
import { SumCrudRepositoryRequest } from '@/data'

describe('Sum Crud Repository', () => {
  const mockSumApi: SumApi = {
    sum: jest.fn()
  }

  const repository = new SumCrudRepositoryImpl(mockSumApi)

  it('Should call sum api and return the result', async function() {
    const mockRequest: SumCrudRepositoryRequest = {
      field: faker.database.column()
    }

    const mockSum = faker.datatype.number()

    sinon.stub(mockSumApi, 'sum')
      .withArgs(mockRequest)
      .resolves(mockSum)

    expect(await repository.sum(mockRequest)).toEqual(mockSum)
  })
})
