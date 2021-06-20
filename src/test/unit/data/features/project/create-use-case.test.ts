import faker from 'faker'
import sinon from 'sinon'

import { CreateProjectUseCaseImpl } from '@/data'
import { CreateFinancesForProjectUseCase, CreateProjectPhasesForProjectUseCase, CreateProjectScopesForProjectUseCase } from '@/domain'
import { mockCreateCrudUseCase, mockCreateProjectRequestDTO, mockDeleteCrudUseCase } from '../../mocks'
import { mockProjectEntity } from '@/test/utilities/mocks'

describe('Create Project Use Case', function() {
  const mockCreateFinancesUseCase: CreateFinancesForProjectUseCase = {
    create: jest.fn()
  }

  const mockCreateProjectScopesUseCase: CreateProjectScopesForProjectUseCase = {
    create: jest.fn()
  }

  const mockCreateProjectPhasesUseCase: CreateProjectPhasesForProjectUseCase = {
    create: jest.fn()
  }

  const mockUserId = faker.datatype.number()

  const useCase = new CreateProjectUseCaseImpl({
    userId: mockUserId,
    createCrudUseCase: mockCreateCrudUseCase,
    createFinancesUseCase: mockCreateFinancesUseCase,
    createProjectPhasesUseCase: mockCreateProjectPhasesUseCase,
    createProjectScopesUseCase: mockCreateProjectScopesUseCase,
    deleteCrudUseCase: mockDeleteCrudUseCase
  })

  it('Should create finances, scopes, phases, then create the project and return it', async function() {
    // Arrange
    sinon.stub(mockCreateCrudUseCase, 'create').withArgs(mockCreateProjectRequestDTO).resolves(mockProjectEntity)
    sinon.stub(mockCreateFinancesUseCase, 'create')
      .withArgs({ project: mockProjectEntity, payment: mockCreateProjectRequestDTO.payment })
      .resolves(mockProjectEntity.finances)
    sinon.stub(mockCreateProjectPhasesUseCase, 'create')
      .withArgs({ project: mockProjectEntity })
      .resolves(mockProjectEntity.projectPhases)
    sinon.stub(mockCreateProjectScopesUseCase, 'create')
      .withArgs({ project: mockProjectEntity, scopes: mockCreateProjectRequestDTO.scopes })
      .resolves(mockProjectEntity.projectScopes)

    // Act
    const receivedProject = await useCase.create(mockCreateProjectRequestDTO)

    // Assert
    const expectedProject = mockProjectEntity
    expect(receivedProject).toEqual(expectedProject)
  })

  it('Should create finances, scopes try to crate phases which will thrown an error and the delete the project and throw the error', async function() {
    // Arrange
    const errorMessage = 'Error'

    sinon.stub(mockCreateCrudUseCase, 'create').withArgs(mockCreateProjectRequestDTO).resolves(mockProjectEntity)
    sinon.stub(mockCreateFinancesUseCase, 'create')
      .withArgs({ project: mockProjectEntity, payment: mockCreateProjectRequestDTO.payment })
      .resolves(mockProjectEntity.finances)
    sinon.stub(mockCreateProjectScopesUseCase, 'create')
      .withArgs({ project: mockProjectEntity, scopes: mockCreateProjectRequestDTO.scopes })
      .resolves(mockProjectEntity.projectScopes)
    sinon.stub(mockCreateProjectPhasesUseCase, 'create')
      .withArgs({ project: mockProjectEntity })
      .rejects(new Error(errorMessage))

    // Act
    // Assert
    expect(async () => { await useCase.create(mockCreateProjectRequestDTO) }).rejects.toThrowError(errorMessage)
  })

  it('Should return the user id', function() {
    // Arrange

    // Act
    const receivedId = useCase.getTechnicalManagerId(undefined)

    // Assert
    const expectedId = { id: mockUserId }
    expect(receivedId).toEqual(expectedId)
  })
})

afterEach(() => sinon.restore())