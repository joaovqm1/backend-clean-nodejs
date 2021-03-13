import {
  DeleteApiImpl,
  ErrorHandlerImpl
} from '@/infra'
import User from '@/infra/database/models/user'

import sinon from 'sinon'

describe('Database Delete Api', () => {
  const errorHandler: ErrorHandlerImpl = new ErrorHandlerImpl('Error message')
  const deleteImpl: DeleteApiImpl = new DeleteApiImpl(User, errorHandler)

  const users: any = [{
    name: 'name1',
    id: 1,
    destroy: () => { }
  }]

  it('Should delete', async function() {
    sinon.stub(User, 'findOne')
      .withArgs({ where: { id: 1 } })
      .returns(users[0])

    expect(await deleteImpl.delete(1)).toEqual(users[0])
  })

  it('Should delete with error', async function() {
    //Arrange
    sinon.stub(User, 'findOne').throws('Error')

    sinon.stub(errorHandler, 'handleSequelizeError')
      .returns(new Error('Error message'))

    //Act and assert
    expect(await deleteImpl.delete(1)).toStrictEqual(new Error('Error message'))
  })

  it('Should delete many', async function() {
    //Arrange
    sinon.stub(deleteImpl, 'delete')
      .withArgs(1)
      .returns(users[0])

    //Act and assert
    expect(await deleteImpl.deleteMany([1])).toEqual(users)
  })

  it('Should delete many with error', async function() {
    //Arrange
    sinon.stub(deleteImpl, 'delete')
      .withArgs(1)
      .throws(new Error('Error message'))

    sinon.stub(errorHandler, 'handleSequelizeError')
      .returns(new Error('Error message'))

    //Act and assert
    expect(await deleteImpl.deleteMany([1])).toStrictEqual(new Error('Error message'))
  })
})

afterEach(() => {
  sinon.restore()
})
