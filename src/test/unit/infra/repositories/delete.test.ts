
import User from '@/infra/database/models/user'

import sinon from 'sinon'
import {
  ReadApiImpl,
  ReadCrudRepositoryImpl,
  DeleteApiImpl,
  ErrorHandlerImpl,
  DeleteCrudRepositoryImpl
} from '@/infra'

import { FilterBuilder } from '@/data'

describe('Infra - Delete Crud Repository', () => {
  const errorHandler: ErrorHandlerImpl = new ErrorHandlerImpl('Error message')

  const readImpl: ReadApiImpl = new ReadApiImpl({
    sequelizeModel: undefined,
    queryCreater: undefined
  })

  const readRepository: ReadCrudRepositoryImpl = new ReadCrudRepositoryImpl(readImpl)

  const deleteImpl: DeleteApiImpl = new DeleteApiImpl(User, errorHandler)

  const deleteRepository = new DeleteCrudRepositoryImpl(deleteImpl, readRepository)

  it('Should get', async function() {
    const user: any = {
      name: 'name',
      id: 1,
      destroy: () => { }
    }

    sinon.stub(FilterBuilder.prototype, 'build')
      .withArgs()
      .returns([{ name: 'equalTo', field: 'id', value: 1 }])

    sinon.stub(readRepository, 'getOne')
      .withArgs([{ name: 'equalTo', field: 'id', value: 1 }])
      .returns(user)

    expect(await deleteRepository.get(1)).toEqual(user)
  })

  it('Should Delete', async function() {
    sinon.stub(deleteImpl, 'delete')
      .withArgs(1)
      .resolves({ id: 1 })

    expect(await deleteRepository.delete(1)).toEqual({ id: 1 })
  })
})

afterEach(() => {
  sinon.restore()
})
