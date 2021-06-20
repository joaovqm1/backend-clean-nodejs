import { ProjectTypeModelMapper, ProjectTypeModel } from '@/data'
import { CreateProjectTypeRequestDTO, ReadProjectTypeResponseDTO, UpdateProjectTypeRequestDTO } from '@/domain'
import { mockProjectTypeEntity } from '@/test/utilities/mocks'

describe('Data - ProjectType Model Mapper', function() {
  const modelMapper = new ProjectTypeModelMapper()

  const model: ProjectTypeModel = {
    ...mockProjectTypeEntity
  }
  describe('Create', function() {
    it('Should transform create request dto to model', function() {
      const createRequestDTO: CreateProjectTypeRequestDTO = mockProjectTypeEntity
      expect(modelMapper.fromCreateRequestDTOToModel(createRequestDTO)).toEqual(model)
    })
  })

  describe('Read', function() {
    it('Should transform model to read one response dto', function() {
      const readResponse: ReadProjectTypeResponseDTO = {
        ...mockProjectTypeEntity
      }
      expect(modelMapper.fromModelToReadOneResponse(model)).toEqual(readResponse)
    })

    it('Should transform model to read many response dto', function() {
      const readResponse: ReadProjectTypeResponseDTO = {
        ...mockProjectTypeEntity
      }
      expect(modelMapper.fromModelToReadManyResponse([model])).toEqual([readResponse])
    })
  })

  describe('Update', function() {
    it('Should transform update request dto to model', function() {
      const updateRequestDTO: UpdateProjectTypeRequestDTO = mockProjectTypeEntity
      expect(modelMapper.fromUpdateRequestDTOToModel(updateRequestDTO)).toEqual(model)
    })
  })
})
