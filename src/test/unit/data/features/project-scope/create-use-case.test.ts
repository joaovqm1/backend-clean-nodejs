import sinon from 'sinon'
import faker from 'faker'

import { CreateProjectScopesForProjectRequestDTO, ReadProjectScopeResponseDTO } from '@/domain'
import { mockCreateCrudUseCase, mockReadCrudUseCase } from '../../mocks'
import { mockProjectScopeEntity, mockScopeEntity } from '@/test/utilities/mocks'
import { CreateProjectScopesForProjectImpl } from '@/data/features/project-scope/create-use-case'
import { FilterBuilder } from '@/data'

describe('Create Projects Scopes for project', function() {
  const useCase = new CreateProjectScopesForProjectImpl({
    readScopesUseCase: mockReadCrudUseCase,
    createProjectScopeUseCase: mockCreateCrudUseCase
  })

  it('Should create a project\'s project scope for each scope passed', async function() {
    // Arrange
    const mockProject = { id: 1 }
    const mockScopes = [{
      id: 1,
      description: faker.random.word()
    }]
    const mockRequest: CreateProjectScopesForProjectRequestDTO = {
      project: mockProject,
      scopes: mockScopes
    }

    sinon.stub(useCase, 'getScopesByIds')
      .withArgs(mockScopes.map((scope) => scope.id))
      .resolves(mockScopes)


    sinon.stub(mockCreateCrudUseCase, 'create')
      .withArgs({
        project: mockProject,
        scope: mockScopes[0]
      })
      .resolves(mockProjectScopeEntity)

    // Act
    const receivedProjectsScopes: ReadProjectScopeResponseDTO[] = await useCase.create(mockRequest)

    // Assert
    const expectedProjectsScopes: ReadProjectScopeResponseDTO[] = [mockProjectScopeEntity]
    expect(receivedProjectsScopes).toEqual(expectedProjectsScopes)
  })

  it('Should return the scopes found by ids', async function() {
    // Arrange
    const filters = new FilterBuilder()
      .containedIn('id', [1])
      .select(['id'])
      .build()

    sinon.stub(mockReadCrudUseCase, 'getMany')
      .withArgs(filters)
      .resolves({ items: [mockScopeEntity] })

    // Act
    const receivedScopes = await useCase.getScopesByIds([1])

    // Assert
    const expectedScopes = [mockScopeEntity]
    expect(receivedScopes).toEqual(expectedScopes)
  })
})

afterEach(() => sinon.restore())