import sinon from 'sinon'
import { omit } from 'lodash'

import {
  CreateOfficeRequestDTO,
  CreateUserForOfficeRequestDTO,
  CreateUserForOfficeResponseDTO,
  CreateOfficeResponseDTO
} from '@/domain'
import {
  CreateOfficeUseCaseImpl,
  OfficeModelMapper,
  CreateUserForOfficeUseCaseImpl,
  ReadOfficeUseCaseImpl,
  OfficeModel
} from '@/data/features'
import {
  CreateCrudRepositoryImpl,
  DeleteCrudRepositoryImpl
} from '@/infra'
import { mockOfficeEntity, mockUserEntity } from '@/test/utilities/mocks'

describe('Data - Create Office Use Case', function() {
  const createRepository = new CreateCrudRepositoryImpl(undefined)
  const deleteRepository = new DeleteCrudRepositoryImpl(undefined, undefined)

  const modelMapper = new OfficeModelMapper()

  const createUserForOfficeUseCase = new CreateUserForOfficeUseCaseImpl({
    createUserUseCase: undefined,
    modelMapper: undefined
  })

  const afterCreateOfficeUseCase = new ReadOfficeUseCaseImpl({
    readCrudUseCase: undefined,
    userIdentification: undefined
  })

  const createOfficeUseCase = new CreateOfficeUseCaseImpl({
    createRepository,
    deleteRepository,
    modelMapper,
    createUserForOfficeUseCase: createUserForOfficeUseCase,
    afterCreateUseCase: afterCreateOfficeUseCase
  })

  it('Should return a new Office with User when passed valid params', async function() {
    const params: CreateOfficeRequestDTO = {
      ...omit(mockOfficeEntity, ['id']),
      user: {
        username: 'user',
        password: 'user'
      }
    }

    const objectModel: Omit<OfficeModel, 'id'> = {
      ...omit(mockOfficeEntity, 'id'),
      planId: params.plan.id,
      stateId: params.state.id,
      cityId: params.city.id
    }

    const office: OfficeModel = {
      ...objectModel,
      id: mockOfficeEntity.id
    }

    const newUser: CreateUserForOfficeRequestDTO = {
      officeId: office.id,
      email: params.email,
      cpf: office.cpf,
      username: params.user.username,
      password: params.user.password,
      name: params.owner
    }
    const userForOffice: CreateUserForOfficeResponseDTO = mockUserEntity

    const newOffice: CreateOfficeResponseDTO = {
      ...office,
      user: userForOffice
    }

    sinon.stub(modelMapper, 'fromCreateRequestDTOToModel')
      .withArgs(params)
      .returns(objectModel)

    sinon.stub(createRepository, 'create')
      .withArgs(objectModel)
      .resolves(office)

    sinon.stub(afterCreateOfficeUseCase, 'fetchAfterCreation')
      .withArgs(office.id)
      .resolves(office)

    sinon.stub(createUserForOfficeUseCase, 'create')
      .withArgs(newUser)
      .resolves(userForOffice)

    expect(await createOfficeUseCase.create(params)).toEqual(newOffice)
  })

  it('Should call delete office if error if thrown when trying to create user', async function() {
    const params: CreateOfficeRequestDTO = {
      ...omit(mockOfficeEntity, ['id']),
      user: {
        username: 'user',
        password: 'user'
      }
    }

    const objectModel: Omit<OfficeModel, 'id'> = {
      ...omit(mockOfficeEntity, 'id'),
      planId: params.plan.id,
      stateId: params.state.id,
      cityId: params.city.id
    }

    const office: OfficeModel = {
      ...objectModel,
      id: mockOfficeEntity.id
    }

    const newUser: CreateUserForOfficeRequestDTO = {
      officeId: office.id,
      email: params.email,
      cpf: office.cpf,
      username: params.user.username,
      password: params.user.password,
      name: params.owner
    }
    const userForOffice: CreateUserForOfficeResponseDTO = mockUserEntity

    const newOffice: CreateOfficeResponseDTO = {
      ...office,
      user: userForOffice
    }

    sinon.stub(modelMapper, 'fromCreateRequestDTOToModel')
      .withArgs(params)
      .returns(objectModel)

    sinon.stub(createRepository, 'create')
      .withArgs(objectModel)
      .resolves(office)

    sinon.stub(afterCreateOfficeUseCase, 'fetchAfterCreation')
      .withArgs(office.id)
      .resolves(office)

    sinon.stub(createUserForOfficeUseCase, 'create')
      .withArgs(newUser)
      .rejects(new Error('Error'))

    const deleteSpy = sinon.stub(deleteRepository, 'delete')

    await expect(async () => createOfficeUseCase.create(params))
      .rejects
      .toThrowError('Error')
    expect(deleteSpy.getCall(0).args).toEqual([mockOfficeEntity.id])
  })
})

afterEach(() => sinon.restore())
