import { ProjectTypeEntity } from '../entity'

export interface CreateProjectTypeRequestDTO
  extends Omit<ProjectTypeEntity, 'id'> {}
export interface CreateProjectTypeResponseDTO
  extends ProjectTypeEntity {}
