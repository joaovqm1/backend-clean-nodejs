import {
  CreateImpl,
  ErrorHandlerImpl
} from '@/infra'
import User from '@/infra/database/models/user'

import { Model } from 'sequelize'
import sinon from 'sinon'

describe('Database Create Api', () => {
  const errorHandler: ErrorHandlerImpl = new ErrorHandlerImpl('Error message')
  const createImpl: CreateImpl = new CreateImpl({
    modelName: 'user',
    sequelizeModel: User,
    errorHandler,
    userId: undefined,
    userOfficeId: 1,
    isPublicTable: false
  })

  it('Should save new object', async function() {
    const modelUser: Model = new User()

    const saveStub = sinon.stub(modelUser, 'save')
    await createImpl.saveAndHandleErrors(modelUser)
    sinon.assert.calledOnce(saveStub)
  })

  it('Should handle errors', async function() {
    const modelUser: Model = new User()

    sinon.stub(modelUser, 'save').throws('Error message')

    sinon.stub(errorHandler, 'handleSequelizeError')
      .returns({ name: 'user', message: 'Error message' })

    expect(await createImpl.saveAndHandleErrors(modelUser)).toEqual({ name: 'user', message: 'Error message' })
  })

  it('Should create', async function() {
    const object: any = {
      name: 'name',
      officeId: 1
    }
    const user: any = new User()
    user.dataValues = object
    sinon.stub(User, 'build')
      .withArgs(object)
      .returns(user)

    sinon.stub(createImpl, 'saveAndHandleErrors')
      .withArgs(user)
      .returns(user)

    expect(await createImpl.create(object)).toEqual(object)
  })
})

afterEach(() => {
  sinon.restore()
})
