import { DocumentEntity } from '@/domain'

export interface DocumentModel extends DocumentEntity {
  projectId?: number
  // projectScopeId?: number
  // projectPhaseId?: number
}
