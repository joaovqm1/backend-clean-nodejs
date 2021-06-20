import faker from 'faker'
import sinon from 'sinon'

import { FilterBuilder, UpdateProjectUseCaseImpl } from '@/data'
import { UpdateFinancesForProjectUseCase, UpdateProjectScopesForProjectUseCase } from '@/domain'
import { mockCreateProjectRequestDTO, mockReadCrudUseCase, mockUpdateCrudUseCase } from '../../mocks'
import { mockProjectEntity } from '@/test/utilities/mocks'

describe('Update Project Use Case', function() {
  const mockUpdateFinancesUseCase: UpdateFinancesForProjectUseCase = {
    update: jest.fn()
  }

  const mockUpdateUpdateScopesUseCase: UpdateProjectScopesForProjectUseCase = {
    update: jest.fn()
  }

  const useCase = new UpdateProjectUseCaseImpl({
    updateCrudUseCase: mockUpdateCrudUseCase,
    readCrudUseCase: mockReadCrudUseCase,
    updateFinancesUseCase: mockUpdateFinancesUseCase,
    updateProjectScopesUseCase: mockUpdateUpdateScopesUseCase
  })

  const mockUpdateProjectRequestDTO = {
    ...mockCreateProjectRequestDTO,
    id: mockProjectEntity.id
  }

  it('Should create finances, scopes, phases, then create the project and return it', async function() {
    // Arrange
    sinon.stub(mockUpdateCrudUseCase, 'update').withArgs(mockUpdateProjectRequestDTO).resolves(mockProjectEntity)
    sinon.stub(mockUpdateFinancesUseCase, 'update')
      .withArgs({
        project: mockProjectEntity,
        payment: mockUpdateProjectRequestDTO.payment
      })
      .resolves(mockProjectEntity.finances)
    sinon.stub(mockUpdateUpdateScopesUseCase, 'update')
      .withArgs({ project: mockProjectEntity, scopes: mockUpdateProjectRequestDTO.scopes })
      .resolves(mockProjectEntity.projectScopes)

    // Act
    const receivedProject = await useCase.update(mockUpdateProjectRequestDTO)

    // Assert
    const expectedProject = mockProjectEntity
    expect(receivedProject).toEqual(expectedProject)
  })
})