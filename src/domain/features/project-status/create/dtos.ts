import { ProjectStatusEntity } from '../entity'

export interface CreateProjectStatusRequestDTO
  extends Omit<ProjectStatusEntity, 'id'> {}
export interface CreateProjectStatusResponseDTO
  extends ProjectStatusEntity {}
