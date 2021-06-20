import { BaseEntity } from '@/domain/base-entity'
export interface TaskEntity extends BaseEntity {
  id: number
  title: string
  description: string
  status: TaskStatus
  startDate: string
  finishDate?: string
  startTime?: string
  finishTime?: string
  responsible: Responsible
}

export enum TaskStatus {
  OPENED = 'ABERTA',
  FINISHED = 'FINALIZADA'
}
interface Responsible {
  id: number
  username?: string
  name?: string
}

export const tasksFieldsToInclude = [
  'responsible.id',
  'responsible.name',
  'responsible.username'
]