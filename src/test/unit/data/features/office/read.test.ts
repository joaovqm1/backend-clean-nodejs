import sinon from 'sinon'

import { OfficeEntity, officeFieldsToInclude, ReadCrudRequestDTO, UnauthorizedOfficesAcesssError } from '@/domain'
import { ReadOfficeUseCaseImpl, ReadCrudUseCaseImpl, FilterBuilder } from '@/data'
import { RequestParams } from '@/main/factories'
import { mockOfficeEntity } from '@/test/utilities/mocks'
import { MissingIdError } from '@/domain/features/office/read/errors/id-not-informed'

afterEach(function() {
  sinon.restore()
})

describe('Data - Read Office Use Case', function() {
  const mockParams: RequestParams = {
    feature: 'office',
    officeId: 1,
    operation: 'CREATE'
  }

  const mockId = 1

  const readCrudUseCase = new ReadCrudUseCaseImpl<OfficeEntity>({
    repository: undefined,
    modelMapper: undefined
  })

  const readOfficeUseCase = new ReadOfficeUseCaseImpl({
    readCrudUseCase: readCrudUseCase,
    userIdentification: mockParams
  })

  const mockFilters = new FilterBuilder()
    .equalTo('id', mockId)
    .include(officeFieldsToInclude)
    .build()

  it('Should return office for logged user', async function() {
    sinon.stub(readCrudUseCase, 'getOne')
      .withArgs(mockFilters)
      .resolves(mockOfficeEntity)

    expect(await readOfficeUseCase.getOfficeForLoggedUser(mockId)).toEqual(mockOfficeEntity)
  })

  it('Should return fetch object after creation', async function() {
    sinon.stub(readOfficeUseCase, 'getById')
      .withArgs(mockId)
      .resolves(mockOfficeEntity)

    expect(await readOfficeUseCase.fetchAfterCreation(mockId)).toEqual(mockOfficeEntity)
  })

  it('Should return fetch object after update', async function() {
    sinon.stub(readOfficeUseCase, 'getById')
      .withArgs(mockId)
      .resolves(mockOfficeEntity)

    expect(await readOfficeUseCase.fetchAfterUpdate(mockId)).toEqual(mockOfficeEntity)
  })

  it('Should return fetch object after update', async function() {
    sinon.stub(readOfficeUseCase, 'getById')
      .withArgs(mockId)
      .resolves(mockOfficeEntity)

    expect(await readOfficeUseCase.fetchAfterCreation(mockId)).toEqual(mockOfficeEntity)
  })

  it('Should throw a error when trying get an office without id', async function() {
    await expect(async function() { await readOfficeUseCase.getOne([]) })
      .rejects
      .toThrowError(new MissingIdError())
  })

  it('Should throw an error when trying to get one office with different id of the current office', async function() {
    const mockFilters = new FilterBuilder()
      .equalTo('id', 3)
      .build()

    await expect(async function() { await readOfficeUseCase.getOne(mockFilters) })
      .rejects
      .toThrowError('Você não possui permissão para acessar esse escritório')
  })

  it('Should add fields to include on filters when it is not passed', async function() {
    const mockFiltersWithId = new FilterBuilder()
      .equalTo('id', mockId)
      .build()

    sinon.stub(readCrudUseCase, 'getOne')
      .withArgs(mockFilters)
      .resolves(mockOfficeEntity)

    expect(await readOfficeUseCase.getOne(mockFiltersWithId)).toEqual(mockOfficeEntity)
  })

  it('Should return a office normally when passing all corrects params', async function() {
    sinon.stub(readCrudUseCase, 'getOne')
      .withArgs(mockFilters)
      .resolves(mockOfficeEntity)

    expect(await readOfficeUseCase.getOne(mockFilters)).toEqual(mockOfficeEntity)
  })

  it('Should throw a error when i try get many office without correct authorization', async function() {
    await expect(async function() { await readOfficeUseCase.getMany([]) })
      .rejects
      .toThrowError(new UnauthorizedOfficesAcesssError())
  })
})

afterEach(() => sinon.restore())
