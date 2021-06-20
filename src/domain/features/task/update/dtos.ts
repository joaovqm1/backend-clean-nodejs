import { TaskEntity } from '../entity'

export interface UpdateTaskRequestDTO extends Omit<TaskEntity, 'responsible'> {
  responsible?: {
    id: number
  }
}
export interface UpdateTaskResponseDTO extends TaskEntity { }
