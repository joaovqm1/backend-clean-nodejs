import { ProjectStatusModelMapper, ProjectStatusModel } from '@/data'
import { CreateProjectStatusRequestDTO, ReadProjectStatusResponseDTO, UpdateProjectStatusRequestDTO } from '@/domain'
import { mockProjectStatusEntity } from '@/test/utilities/mocks'

describe('Data - ProjectStatus Model Mapper', function() {
  const modelMapper = new ProjectStatusModelMapper()

  const model: ProjectStatusModel = {
    ...mockProjectStatusEntity
  }
  describe('Create', function() {
    it('Should transform create request dto to model', function() {
      const createRequestDTO: CreateProjectStatusRequestDTO = mockProjectStatusEntity
      expect(modelMapper.fromCreateRequestDTOToModel(createRequestDTO)).toEqual(model)
    })
  })

  describe('Read', function() {
    it('Should transform model to read one response dto', function() {
      const readResponse: ReadProjectStatusResponseDTO = {
        ...mockProjectStatusEntity
      }
      expect(modelMapper.fromModelToReadOneResponse(model)).toEqual(readResponse)
    })

    it('Should transform model to read many response dto', function() {
      const readResponse: ReadProjectStatusResponseDTO = {
        ...mockProjectStatusEntity
      }
      expect(modelMapper.fromModelToReadManyResponse([model])).toEqual([readResponse])
    })
  })

  describe('Update', function() {
    it('Should transform update request dto to model', function() {
      const updateRequestDTO: UpdateProjectStatusRequestDTO = mockProjectStatusEntity
      expect(modelMapper.fromUpdateRequestDTOToModel(updateRequestDTO)).toEqual(model)
    })
  })
})
