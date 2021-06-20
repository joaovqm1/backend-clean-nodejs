import { BaseEntity } from '@/domain/base-entity'

import { ProjectPhaseEntity } from '../project-phase'
import { ProjectScopeEntity } from '../project-scope'

export interface DocumentEntity extends BaseEntity {
  id: number
  description: string
  key: string
  name: string
  path: string
  extension: string
  mimeType: string
  size: number
  project?: {
    id: number
    name?: string
  }
  projectScope?: Pick<ProjectScopeEntity, 'id' | 'scope'>
  projectPhase?: Pick<ProjectPhaseEntity, 'id' | 'phase'>
}
