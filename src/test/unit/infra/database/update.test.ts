import {
  UpdateApiImpl,
  ErrorHandlerImpl
} from '@/infra'
import User from '@/infra/database/models/user'
import { Model } from 'sequelize'

import sinon from 'sinon'

describe('Infra - Database Update Api', () => {
  const errorHandler: ErrorHandlerImpl = new ErrorHandlerImpl('Error message')
  const params = {
    errorHandler,
    sequelizeModel: User,
    userId: 1
  }
  const updateImpl: UpdateApiImpl = new UpdateApiImpl(params)

  it('Should update', async function() {
    const objectToUpdate = {
      id: 1,
      field: 'value'
    }

    const modelUser: Model = new User()
    sinon.stub(User, 'findOne')
      .withArgs({ where: { id: objectToUpdate.id } })
      .resolves(modelUser)

    sinon.stub(updateImpl, 'shouldAddUpdaterId')
      .returns(true)

    sinon.stub(updateImpl, 'saveAndHandleErrors')
      .withArgs(modelUser)
      .resolves(modelUser)

    expect(await updateImpl.update(objectToUpdate)).toEqual(modelUser)
  })

  it('Should return true if it should add updaterId', () => {
    expect(updateImpl.shouldAddUpdaterId() && true).toEqual(true)
  })

  it('Should save', async function() {
    const modelUser: Model = new User()

    const saveStub = sinon.stub(modelUser, 'save')
    await updateImpl.saveAndHandleErrors(modelUser)
    sinon.assert.calledOnce(saveStub)
  })

  it('Should handle errors', async function() {
    const modelUser: Model = new User()

    sinon.stub(modelUser, 'save').throws('Error message')

    sinon.stub(errorHandler, 'handleSequelizeError')
      .returns({ name: 'user', message: 'Error message' })

    expect(await updateImpl.saveAndHandleErrors(modelUser)).toEqual({ name: 'user', message: 'Error message' })
  })
})

afterEach(() => {
  sinon.restore()
})
