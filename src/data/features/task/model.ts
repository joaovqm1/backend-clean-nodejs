import { TaskEntity } from '@/domain'

export interface TaskModel extends TaskEntity {
  responsibleId?: number
}
