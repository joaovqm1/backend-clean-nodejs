import { ProjectPhaseModelMapper, ProjectPhaseModel } from '@/data'
import { CreateProjectPhaseRequestDTO, ReadProjectPhaseResponseDTO, UpdateProjectPhaseRequestDTO } from '@/domain'
import { mockProjectPhaseEntity } from '@/test/utilities/mocks'

describe('Project Phase Model Mapper', function() {
  const modelMapper = new ProjectPhaseModelMapper()

  const model: ProjectPhaseModel = {
    ...mockProjectPhaseEntity,
    phaseId: mockProjectPhaseEntity.phase.id,
    projectId: mockProjectPhaseEntity.project.id
  }

  describe('Create', function() {
    it('Should transform create request dto to model', function() {
      const createRequestDTO: CreateProjectPhaseRequestDTO = mockProjectPhaseEntity
      expect(modelMapper.fromCreateRequestDTOToModel(createRequestDTO)).toEqual(model)
    })
  })

  describe('Read', function() {
    it('Should transform model to read one response dto', function() {
      const readResponse: ReadProjectPhaseResponseDTO = {
        ...mockProjectPhaseEntity
      }
      expect(modelMapper.fromModelToReadOneResponse(model)).toEqual(readResponse)
    })

    it('Should transform model to read many response dto', function() {
      const readResponse: ReadProjectPhaseResponseDTO = {
        ...mockProjectPhaseEntity
      }
      expect(modelMapper.fromModelToReadManyResponse([model])).toEqual([readResponse])
    })
  })

  describe('Update', function() {
    it('Should transform update request dto to model', function() {
      const updateRequestDTO: UpdateProjectPhaseRequestDTO = mockProjectPhaseEntity
      expect(modelMapper.fromUpdateRequestDTOToModel(updateRequestDTO)).toEqual(model)
    })
  })
})
