import { ProjectEntity } from '@/domain'

export interface ProjectModel extends ProjectEntity {
  customerId: number
  projectStatusId: number
  projectTypeId: number
  technicalManagerId: number
  cityId?: number
  stateId?: number
}
