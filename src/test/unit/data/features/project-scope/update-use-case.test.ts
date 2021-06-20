import sinon from 'sinon'
import faker from 'faker'

import { ReadProjectScopeResponseDTO, UpdateProjectScopesForProjectRequestDTO } from '@/domain'
import { mockDeleteCrudUseCase, mockReadCrudUseCase } from '../../mocks'
import { mockProjectScopeEntity, mockScopeEntity } from '@/test/utilities/mocks'
import { CreateProjectScopesForProjectImpl, FilterBuilder, UpdateProjectScopesForProjectImpl } from '@/data'

describe('Update Projects Scopes for project', function() {
  const mockCreateProjectScopeForProjectUseCase = new CreateProjectScopesForProjectImpl({
    readScopesUseCase: undefined,
    createProjectScopeUseCase: undefined
  })

  const useCase = new UpdateProjectScopesForProjectImpl({
    createProjectScopeForProjectUseCase: mockCreateProjectScopeForProjectUseCase,
    readProjectScopeUseCase: mockReadCrudUseCase,
    deleteUseCase: mockDeleteCrudUseCase
  })

  const mockProjectId = faker.datatype.number()

  const mockRequest: UpdateProjectScopesForProjectRequestDTO = {
    project: {
      id: mockProjectId
    },
    scopes: [mockScopeEntity]
  }

  it('Should add and delete some projects scopes and return the current ones combined with the created', async function() {
    // Arrange
    sinon.stub(useCase, 'getCurrentProjectsScopes').withArgs(mockRequest.project.id).resolves([mockProjectScopeEntity])
    sinon.stub(useCase, 'getScopesToAdd').withArgs(mockRequest, [mockProjectScopeEntity]).returns([mockScopeEntity])
    sinon.stub(mockCreateProjectScopeForProjectUseCase, 'create').withArgs({ ...mockRequest, scopes: [mockScopeEntity] }).resolves([mockProjectScopeEntity])
    sinon.stub(useCase, 'getProjectsScopesToDelete').withArgs(mockRequest, [mockProjectScopeEntity]).returns([mockProjectScopeEntity])
    sinon.stub(mockDeleteCrudUseCase, 'delete').withArgs(mockProjectScopeEntity.id).resolves('Item removido com sucesso')
    sinon.stub(useCase, 'getCurrentProjectsScopesWhichWereDeleted').withArgs([mockProjectScopeEntity], [mockProjectScopeEntity]).returns([mockProjectScopeEntity])

    // Act
    const receivedProjectScopes = await useCase.update(mockRequest)

    // Assert
    const expectedProjectsScopes = [mockProjectScopeEntity, mockProjectScopeEntity]
    expect(receivedProjectScopes).toEqual(expectedProjectsScopes)
  })

  it('Should return the current project scopes', async function() {
    // Arrange
    const filters = new FilterBuilder()
      .equalTo('projectId', mockProjectId)
      .select(['id'])
      .include(['scope.id', 'scope.description'])
      .build()

    sinon.stub(mockReadCrudUseCase, 'getMany')
      .withArgs(filters)
      .resolves({ items: [mockProjectScopeEntity] })

    // Act
    const receivedScopes = await useCase.getCurrentProjectsScopes(mockProjectId)

    // Assert
    const expectedScopes = [mockProjectScopeEntity]
    expect(receivedScopes).toEqual(expectedScopes)
  })

  it('Should return the scopes to add', async function() {
    // Arrange
    const mockCurrentProjectScopes: ReadProjectScopeResponseDTO[] = [mockProjectScopeEntity]

    // Act
    const receivedScopes = useCase.getScopesToAdd(mockRequest, mockCurrentProjectScopes)

    // Assert
    const expectedScopes = [mockScopeEntity]
    expect(receivedScopes).toEqual(expectedScopes)
  })

  it('Should return the projects scopes to delete', async function() {
    // Arrange
    const mockCurrentProjectScopes: ReadProjectScopeResponseDTO[] = [
      mockProjectScopeEntity,
      {
        ...mockProjectScopeEntity,
        scope: mockScopeEntity
      }
    ]

    // Act
    const receivedScopes = useCase.getProjectsScopesToDelete(mockRequest, mockCurrentProjectScopes)

    // Assert
    const expectedScopes = [mockProjectScopeEntity]
    expect(receivedScopes).toEqual(expectedScopes)
  })

  it('Should return the project scopes which were not deleted', async function() {
    // Arrange
    const mockProjectScopeEntityWhichWasNotDeleted = {
      ...mockProjectScopeEntity,
      id: faker.datatype.number()
    }
    const mockCurrentProjectScopes: ReadProjectScopeResponseDTO[] = [
      mockProjectScopeEntity,
      mockProjectScopeEntityWhichWasNotDeleted
    ]
    const mockDeletedProjectScopes: ReadProjectScopeResponseDTO[] = [mockProjectScopeEntity]

    // Act
    const receivedScopes = useCase.getCurrentProjectsScopesWhichWereDeleted(mockCurrentProjectScopes, mockDeletedProjectScopes)

    // Assert
    const expectedScopes = [mockProjectScopeEntityWhichWasNotDeleted]
    expect(receivedScopes).toEqual(expectedScopes)
  })
})

afterEach(() => sinon.restore())