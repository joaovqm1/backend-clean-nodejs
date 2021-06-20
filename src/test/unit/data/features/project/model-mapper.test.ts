import faker from 'faker'

import { ProjectModel, ProjectModelMapper } from '@/data'
import { UpdateProjectRequestDTO } from '@/domain'
import { objectUtilities } from '@/main'
import { mockProjectEntity, mockProjectModel } from '@/test/utilities/mocks'
import { mockCreateProjectRequestDTO } from '../../mocks'

describe('Project Model Mapper', function() {
  const mapper = new ProjectModelMapper(objectUtilities)

  const modelWithoutRelations: ProjectModel = {
    ...mockProjectModel,
  }
  delete modelWithoutRelations.id
  delete modelWithoutRelations.customer
  delete modelWithoutRelations.projectStatus
  delete modelWithoutRelations.projectScopes
  delete modelWithoutRelations.projectPhases
  delete modelWithoutRelations.projectType
  delete modelWithoutRelations.projectPhases
  delete modelWithoutRelations.technicalManager
  delete modelWithoutRelations.finances
  delete modelWithoutRelations.state
  delete modelWithoutRelations.city

  it('Should transform create request dto to model', async function() {
    // Act
    const receivedModel = mapper.fromCreateRequestDTOToModel(mockCreateProjectRequestDTO)

    // Assert
    expect(receivedModel).toEqual(modelWithoutRelations)
  })

  it('Should transform update request dto to model', async function() {
    // Act
    const mockUpdateRequestDTO: UpdateProjectRequestDTO = {
      id: faker.datatype.number(),
      ...mockCreateProjectRequestDTO
    }
    const receivedModel = mapper.fromUpdateRequestDTOToModel(mockUpdateRequestDTO)

    // Assert
    const expectedModel = {
      id: mockUpdateRequestDTO.id,
      ...modelWithoutRelations
    }
    expect(receivedModel).toEqual(expectedModel)
  })

  it('Should transform models to read response dto', async function() {
    // Arrange
    const copyModel: ProjectModel = {
      ...mockProjectModel
    }
    delete copyModel.customerId
    delete copyModel.cityId
    delete copyModel.stateId
    delete copyModel.technicalManagerId
    delete copyModel.projectTypeId
    delete copyModel.projectStatusId

    // Act
    const receivedResponsesDTO = mapper.fromModelToReadManyResponse([copyModel])

    // Assert
    const expectedResponsesDTO = [mockProjectEntity]
    expect(receivedResponsesDTO).toEqual(expectedResponsesDTO)
  })
})