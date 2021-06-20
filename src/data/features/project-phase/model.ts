import { ProjectPhaseEntity } from '@/domain'

export interface ProjectPhaseModel extends ProjectPhaseEntity {
  phaseId: number
  projectId: number
}
