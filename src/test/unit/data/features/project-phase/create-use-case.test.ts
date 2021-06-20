import sinon from 'sinon'
import faker from 'faker'

import { CreateProjectPhasesForProjectRequestDTO, ReadProjectPhaseResponseDTO } from '@/domain'
import { mockCreateCrudUseCase, mockReadCrudUseCase } from '../../mocks'
import { mockProjectPhaseEntity, mockPhaseEntity } from '@/test/utilities/mocks'
import { CreateProjectPhasesForProjectImpl } from '@/data'
import { FilterBuilder } from '@/data'
import { dateUtilities } from '@/main'

describe('Create Projects Phases for project', function() {
  const useCase = new CreateProjectPhasesForProjectImpl({
    readPhasesUseCase: mockReadCrudUseCase,
    createProjectPhaseUseCase: mockCreateCrudUseCase,
    dateUtilities
  })

  it('Should create a project\'s project Phase for each Phase passed', async function() {
    // Arrange
    const mockProject = { id: 1 }
    const mockPhases = [{
      id: 1,
      description: faker.random.word()
    }]

    const mockRequest: CreateProjectPhasesForProjectRequestDTO = {
      project: mockProject
    }

    sinon.stub(useCase, 'getMainPhases')
      .resolves(mockPhases)

    sinon.stub(mockCreateCrudUseCase, 'create')
      .withArgs({
        project: mockProject,
        startDate: dateUtilities.format(new Date()),
        phase: mockPhases[0]
      })
      .resolves(mockProjectPhaseEntity)

    // Act
    const receivedProjectsPhases: ReadProjectPhaseResponseDTO[] = await useCase.create(mockRequest)

    // Assert
    const expectedProjectsPhases: ReadProjectPhaseResponseDTO[] = [mockProjectPhaseEntity]
    expect(receivedProjectsPhases).toEqual(expectedProjectsPhases)
  })

  it('Should return the Phases found by ids', async function() {
    // Arrange
    const filters = new FilterBuilder()
      .containedIn('description', ['LEVANTAMENTO', 'ANTEPROJETO', 'EXECUTIVO', 'DETALHAMENTO'])
      .select(['id'])
      .build()

    sinon.stub(mockReadCrudUseCase, 'getMany')
      .withArgs(filters)
      .resolves({ items: [mockPhaseEntity] })

    // Act
    const receivedPhases = await useCase.getMainPhases()

    // Assert
    const expectedPhases = [mockPhaseEntity]
    expect(receivedPhases).toEqual(expectedPhases)
  })
})

afterEach(() => sinon.restore())