import sinon from 'sinon'

import {
  ReadApiImpl,
  ReadCrudRepositoryImpl
} from '@/infra'
import { Filter, GetManyResult } from '@/domain'
describe('Infra - Read Crud Repository', () => {
  const readImpl: ReadApiImpl = new ReadApiImpl({
    sequelizeModel: undefined,
    queryCreater: undefined
  })
  const readRepository: ReadCrudRepositoryImpl = new ReadCrudRepositoryImpl(readImpl)

  it('Should get one', async function() {
    const filters: Filter[] = [{ name: 'nome' }]

    sinon.stub(readImpl, 'get')
      .withArgs(filters)
      .resolves({})

    expect(await readRepository.getOne(filters)).toEqual({})
  })

  it('Should get many', async function() {
    const filters: Filter[] = [{ name: 'nome' }]

    const result: GetManyResult = {
      items: [{}]
    }

    sinon.stub(readImpl, 'getMany')
      .withArgs(filters)
      .resolves(result)

    expect(await readRepository.getMany(filters)).toEqual(result)
  })
})
