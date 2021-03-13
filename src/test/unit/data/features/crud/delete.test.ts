import sinon from 'sinon'

import { DeleteCrudRequestDTO, ObjectToDeleteNotFound } from '@/domain'
import { DeleteCrudUseCaseImpl } from '@/data/features'
import { DeleteCrudRepositoryImpl } from '@/infra'

afterEach(function() {
  sinon.restore()
})

describe('Data - Delete CRUD Use Case', function() {
  const deleteRepository = new DeleteCrudRepositoryImpl(undefined, undefined)

  const deleteCrudUseCase = new DeleteCrudUseCaseImpl({
    repository: deleteRepository
  })

  it('Should return success message when passed object id to delete it', async function() {
    const user = { name: 'user' }
    const request: DeleteCrudRequestDTO = 1

    sinon.stub(deleteRepository, 'get')
      .withArgs(request)
      .resolves(user)

    sinon.stub(deleteRepository, 'delete')
      .withArgs(request)
      .resolves()

    expect(await deleteCrudUseCase.delete(request)).toEqual('Item removido com sucesso')
  })

  it('Should throw error when try to delete object not found', async function() {
    const request: DeleteCrudRequestDTO = 1

    sinon.stub(deleteRepository, 'get')
      .withArgs(request)
      .resolves()

    await expect(async function() { await deleteCrudUseCase.delete(request) })
      .rejects
      .toThrowError(new ObjectToDeleteNotFound())
  })
})

afterEach(() => sinon.restore())
