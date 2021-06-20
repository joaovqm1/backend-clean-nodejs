import { TaskEntity } from '../entity'

export interface CreateTaskRequestDTO extends Omit<TaskEntity, 'id' | 'responsible'> {
  responsible?: {
    id: number
  }
}
export interface CreateTaskResponseDTO extends TaskEntity { }
