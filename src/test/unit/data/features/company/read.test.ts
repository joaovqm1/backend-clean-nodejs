import sinon from 'sinon'

import { OfficeEntity, officeFieldsToInclude, ReadCrudRequestDTO, UnauthorizedOfficesAcesssError } from '@/domain'
import { ReadOfficeUseCaseImpl, ReadCrudUseCaseImpl } from '@/data'
import { RequestParams } from '@/main/factories'
import { officeEntity } from '@/test/utilities/mocks'
import { MissingIdError } from '@/domain/features/office/read/errors/id-not-informed'

afterEach(function() {
  sinon.restore()
})

describe('Data - Read Office Use Case', function() {
  const params: RequestParams = {
    feature: 'office',
    officeId: 1,
    operation: 'CREATE'
  }
  const id = 1
  const getOfficeCrudUseCase = new ReadCrudUseCaseImpl<OfficeEntity>({
    filterTransformer: undefined,
    repository: undefined,
    modelMapper: undefined
  })

  const readOfficeUseCase = new ReadOfficeUseCaseImpl({
    readCrudUseCase: getOfficeCrudUseCase,
    userIdentification: params
  })

  it('Should return fields and filters default for office', function() {
    const id = 1

    const requestReturn: ReadCrudRequestDTO = {
      filters: [{
        equalTo: { id: id }
      }],
      fieldsToInclude: officeFieldsToInclude
    }
    expect(readOfficeUseCase.getRequestByIdWithIncludes(id)).toEqual(requestReturn)
  })

  it('Should return office for logged user', async function() {
    const requestReturn: ReadCrudRequestDTO = {
      filters: [{
        equalTo: { id: id }
      }],
      fieldsToInclude: ['state.id']
    }

    sinon.stub(readOfficeUseCase, 'getRequestByIdWithIncludes')
      .withArgs(1)
      .returns(requestReturn)

    sinon.stub(getOfficeCrudUseCase, 'getOne')
      .withArgs(requestReturn)
      .resolves(officeEntity)

    expect(await readOfficeUseCase.getOfficeForLoggedUser(id)).toEqual(officeEntity)
  })

  it('Should return office when Id is passed', async function() {
    const requestReturn: ReadCrudRequestDTO = {
      filters: [{
        equalTo: { id: id }
      }],
      fieldsToInclude: ['state.id']
    }

    sinon.stub(readOfficeUseCase, 'getRequestByIdWithIncludes')
      .withArgs(id)
      .returns(requestReturn)

    sinon.stub(getOfficeCrudUseCase, 'getOne')
      .withArgs(requestReturn)
      .resolves(officeEntity)

    expect(await readOfficeUseCase.getById(id)).toEqual(officeEntity)
  })

  it('Should return fetch object after creation', async function() {
    const requestReturn: ReadCrudRequestDTO = {
      filters: [{
        equalTo: { id: id }
      }],
      fieldsToInclude: ['state.id']
    }

    sinon.stub(readOfficeUseCase, 'getRequestByIdWithIncludes')
      .withArgs(id)
      .returns(requestReturn)

    sinon.stub(getOfficeCrudUseCase, 'getOne')
      .withArgs(requestReturn)
      .resolves(officeEntity)

    sinon.stub(readOfficeUseCase, 'getById')
      .withArgs(id)
      .resolves(officeEntity)

    expect(await readOfficeUseCase.fetchAfterCreation(id)).toEqual(officeEntity)
  })

  it('Should return fetch object after update', async function() {
    const requestReturn: ReadCrudRequestDTO = {
      filters: [{
        equalTo: { id: id }
      }],
      fieldsToInclude: ['state.id']
    }

    sinon.stub(readOfficeUseCase, 'getRequestByIdWithIncludes')
      .withArgs(id)
      .returns(requestReturn)

    sinon.stub(getOfficeCrudUseCase, 'getOne')
      .withArgs(requestReturn)
      .resolves(officeEntity)

    sinon.stub(readOfficeUseCase, 'getById')
      .withArgs(id)
      .resolves(officeEntity)

    expect(await readOfficeUseCase.fetchAfterCreation(id)).toEqual(officeEntity)
  })

  it('Should throw a error when i try get one office pass a query without id', async function() {
    const query: ReadCrudRequestDTO = {
      filters: [{
        equalTo: {}
      }],
      fieldsToInclude: ['state.id']
    }

    await expect(async function() { await readOfficeUseCase.getOne(query) })
      .rejects
      .toThrowError(new MissingIdError())
  })

  it('Should throw a error when i try get one office pass a query wrong office id', async function() {
    const query: ReadCrudRequestDTO = {
      filters: [{
        equalTo: { id: 0 }
      }],
      fieldsToInclude: ['state.id']
    }

    await expect(async function() { await readOfficeUseCase.getOne(query) })
      .rejects
      .toThrowError('Você não possui permissão para acessar esse escritório')
  })

  it('Should add fields when i try get one office pass a query without fields to include', async function() {
    const query: ReadCrudRequestDTO = {
      filters: [{
        equalTo: { id: 1 }
      }],
      fieldsToInclude: officeFieldsToInclude
    }

    sinon.stub(getOfficeCrudUseCase, 'getOne')
      .withArgs(query)
      .resolves(officeEntity)

    expect(await readOfficeUseCase.getOne(query)).toEqual(officeEntity)
  })

  it('Should return a office normally when i pass all corrects params', async function() {
    const query: ReadCrudRequestDTO = {
      filters: [{
        equalTo: { id: 1 }
      }],
      fieldsToInclude: ['state.id']
    }

    sinon.stub(getOfficeCrudUseCase, 'getOne')
      .withArgs(query)
      .resolves(officeEntity)

    expect(await readOfficeUseCase.getOne(query)).toEqual(officeEntity)
  })

  it('Should throw a error when i try get many office without correct authorization', async function() {
    const query: ReadCrudRequestDTO = {
      filters: [{
        equalTo: { id: 1 }
      }],
      fieldsToInclude: ['state.id']
    }

    await expect(async function() { await readOfficeUseCase.getMany(query) })
      .rejects
      .toThrowError(new UnauthorizedOfficesAcesssError())
  })
})

afterEach(() => sinon.restore())
