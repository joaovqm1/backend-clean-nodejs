import { ProjectPhaseEntity } from './entity'

type ProjectPhaseWithNoRelation = Omit<ProjectPhaseEntity, 'id' | 'project' | 'Phase'>
type OnlyId = {
  id: number
}

type ProjectPhaseWithOnlyIdOnRelation = ProjectPhaseWithNoRelation & {
  project: OnlyId
  phase: OnlyId
}

export interface CreateProjectPhaseRequestDTO extends ProjectPhaseWithOnlyIdOnRelation { }

export interface ReadProjectPhaseResponseDTO extends ProjectPhaseEntity { }

export interface UpdateProjectPhaseRequestDTO extends CreateProjectPhaseRequestDTO {
  id: number
}
