import { BaseModelMapper } from '@/data/mapper'
import {
  CreateTaskRequestDTO,
  ReadTaskResponseDTO,
  UpdateTaskRequestDTO,
} from '@/domain'

import { TaskModel } from './model'
export class TaskModelMapper implements BaseModelMapper {
  constructor(private readonly currentUserId: number) { }

  fromCreateRequestDTOToModel(request: CreateTaskRequestDTO): Omit<TaskModel, 'id' | 'responsible'> {
    return this.fromCreateUpdateRequestDTOToModel(request)
  }

  fromCreateUpdateRequestDTOToModel(request: CreateTaskRequestDTO | UpdateTaskRequestDTO): Omit<TaskModel, 'id' | 'responsible' | 'project'> {
    const responsibleId = this.getResponsibleId(request.responsible?.id, this.currentUserId)
    const projectId = request.project?.id

    delete request.responsible
    delete request.project

    return {
      ...request,
      responsibleId,
      projectId,
      title: request.title.toUpperCase(),
      description: request.description?.toUpperCase()
    }
  }

  fromUpdateRequestDTOToModel(request: UpdateTaskRequestDTO): Omit<TaskModel, 'responsible' | 'project'> {
    return this.fromCreateUpdateRequestDTOToModel(request) as Omit<TaskModel, 'responsible' | 'project'>
  }

  getResponsibleId(requestResponsibleId: number, currentUserId: number): number {
    return requestResponsibleId || currentUserId
  }

  fromModelToReadOneResponse(model: TaskModel): ReadTaskResponseDTO {
    return {
      ...model
    }
  }

  fromModelToReadManyResponse(models: TaskModel[]): ReadTaskResponseDTO[] {
    return models.map(this.fromModelToReadOneResponse)
  }
}
