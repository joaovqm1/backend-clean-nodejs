import { TaskModel, TaskModelMapper } from '@/data'
import { CreateTaskRequestDTO, ReadTaskResponseDTO, UpdateTaskRequestDTO } from '@/domain'
import { objectUtilities } from '@/main'
import { mockTaskEntity } from '@/test/utilities/mocks'

describe('Data - Task Model Mapper', function() {
  const modelMapper = new TaskModelMapper(undefined)

  const taskModel: TaskModel = {
    ...mockTaskEntity,
    responsibleId: mockTaskEntity.responsible.id
  }

  describe('Create', function() {
    it('Should transform create request dto to model', function() {
      const createRequestDTO: CreateTaskRequestDTO = objectUtilities.cloneObject(mockTaskEntity)
      const modelCopy = objectUtilities.cloneObject(taskModel)
      delete modelCopy.responsible

      modelCopy.startTime = modelCopy.startTime.toUpperCase()
      modelCopy.finishTime = modelCopy.finishTime.toUpperCase()
      expect(modelMapper.fromCreateRequestDTOToModel(createRequestDTO)).toEqual(modelCopy)
    })
  })

  it('Should return the current user id', async function() {
    // Arrange

    // Act
    const receivedId = modelMapper.getResponsibleId(undefined, 1)

    // Assert
    const expectedId = 1
    expect(receivedId).toEqual(expectedId)
  })

  describe('Read', function() {
    it('Should transform model to read one response dto', function() {
      const readResponse: ReadTaskResponseDTO = mockTaskEntity
      const modelCopy = objectUtilities.cloneObject(taskModel)
      delete modelCopy.responsibleId
      expect(modelMapper.fromModelToReadOneResponse(modelCopy)).toEqual(readResponse)
    })

    it('Should transform model to read many response dto', function() {
      const readResponse: ReadTaskResponseDTO = objectUtilities.cloneObject(mockTaskEntity)
      const modelCopy = objectUtilities.cloneObject(taskModel)
      delete modelCopy.responsibleId

      expect(modelMapper.fromModelToReadManyResponse([modelCopy])).toEqual([readResponse])
    })
  })

  describe('Update', function() {
    it('Should transform update request dto to model', function() {
      const updateRequestDTO: UpdateTaskRequestDTO = objectUtilities.cloneObject(mockTaskEntity)
      const modelCopy = objectUtilities.cloneObject(taskModel)
      delete modelCopy.responsible
      modelCopy.startTime = modelCopy.startTime.toUpperCase()
      modelCopy.finishTime = modelCopy.finishTime.toUpperCase()

      expect(modelMapper.fromUpdateRequestDTOToModel(updateRequestDTO)).toEqual(modelCopy)
    })
  })
})
