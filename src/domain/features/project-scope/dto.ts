import { ProjectScopeEntity } from './entity'

type ProjectScopeWithNoRelation = Omit<ProjectScopeEntity, 'id' | 'project' | 'scope'>
type OnlyId = {
  id: number
}

type ProjectScopeWithOnlyIdOnRelation = ProjectScopeWithNoRelation & {
  project: OnlyId
  scope: OnlyId
}

export interface CreateProjectScopeRequestDTO extends ProjectScopeWithOnlyIdOnRelation { }

export interface ReadProjectScopeResponseDTO extends ProjectScopeEntity { }

export interface UpdateProjectScopeRequestDTO extends CreateProjectScopeRequestDTO {
  id: number
}
