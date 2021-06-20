import faker from 'faker'

import {
  CreateCrudRepositoryImpl,
  CreateImpl,
  ErrorHandlerImpl
} from '@/infra'
import { User } from '@/infra'

import sinon from 'sinon'
describe('Infra - Create Crud Repository', () => {
  const errorHandler: ErrorHandlerImpl = new ErrorHandlerImpl('Error message')
  const createImpl: CreateImpl = new CreateImpl({
    modelName: 'user',
    sequelizeModel: User,
    errorHandler,
    userId: undefined,
    userOfficeId: 1,
    isPublicTable: false
  })
  const createRepository = new CreateCrudRepositoryImpl(createImpl)
  it('Should create', async function() {
    sinon.stub(createImpl, 'create')
      .withArgs({})
      .resolves({})

    expect(await createRepository.create({})).toEqual({})
  })
})
