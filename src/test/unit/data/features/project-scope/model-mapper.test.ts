import { ProjectScopeModelMapper, ProjectScopeModel } from '@/data'
import { CreateProjectScopeRequestDTO, ReadProjectScopeResponseDTO, UpdateProjectScopeRequestDTO } from '@/domain'
import { mockProjectScopeEntity } from '@/test/utilities/mocks'

describe('Project Scope Model Mapper', function() {
  const modelMapper = new ProjectScopeModelMapper()

  const model: ProjectScopeModel = {
    ...mockProjectScopeEntity,
    scopeId: mockProjectScopeEntity.scope.id,
    projectId: mockProjectScopeEntity.project.id
  }

  describe('Create', function() {
    it('Should transform create request dto to model', function() {
      const createRequestDTO: CreateProjectScopeRequestDTO = mockProjectScopeEntity
      expect(modelMapper.fromCreateRequestDTOToModel(createRequestDTO)).toEqual(model)
    })
  })

  describe('Read', function() {
    it('Should transform model to read one response dto', function() {
      const readResponse: ReadProjectScopeResponseDTO = {
        ...mockProjectScopeEntity
      }
      expect(modelMapper.fromModelToReadOneResponse(model)).toEqual(readResponse)
    })

    it('Should transform model to read many response dto', function() {
      const readResponse: ReadProjectScopeResponseDTO = {
        ...mockProjectScopeEntity
      }
      expect(modelMapper.fromModelToReadManyResponse([model])).toEqual([readResponse])
    })
  })

  describe('Update', function() {
    it('Should transform update request dto to model', function() {
      const updateRequestDTO: UpdateProjectScopeRequestDTO = mockProjectScopeEntity
      expect(modelMapper.fromUpdateRequestDTOToModel(updateRequestDTO)).toEqual(model)
    })
  })
})
