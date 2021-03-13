import {
  UpdateCrudRepositoryImpl,
  UpdateApiImpl,
  ErrorHandlerImpl,
  ReadApiImpl
} from '@/infra'
import User from '@/infra/database/models/user'

import { Filter } from '@/data/contracts'
import sinon from 'sinon'
describe('Infra - Update Crud Repository', () => {
  const errorHandler: ErrorHandlerImpl = new ErrorHandlerImpl('Error message')

  const params = {
    errorHandler,
    sequelizeModel: User,
    currentUser: { id: 1 }
  }
  const updateImpl: UpdateApiImpl = new UpdateApiImpl(params)

  const readImpl: ReadApiImpl = new ReadApiImpl({
    sequelizeModel: undefined,
    queryCreater: undefined
  })

  const createRepository = new UpdateCrudRepositoryImpl(updateImpl, readImpl)

  it('Should update', async function() {
    sinon.stub(updateImpl, 'update')
      .withArgs({})
      .resolves({})

    expect(await createRepository.update({})).toEqual({})
  })

  it('Should get', async function() {
    const filters: Filter[] = [{ name: 'nome' }]

    sinon.stub(readImpl, 'get')
      .withArgs(filters)
      .resolves({})

    expect(await createRepository.get(filters)).toEqual({})
  })
})
