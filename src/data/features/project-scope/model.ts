import { ProjectScopeEntity } from '@/domain'

export interface ProjectScopeModel extends ProjectScopeEntity {
  scopeId: number
  projectId: number
}
