import { ProjectPaymentRequestDTO } from '@/domain/features/common'

import { ProjectEntity } from './entity'

type ProjectWithNoRelation =
  Omit<ProjectEntity, 'city' | 'state' | 'projectType' | 'projectStatus' | 'finances' | 'projectPhases' | 'projectScopes' | 'customer' | 'technicalManager' | 'payment'
  >

type OnlyId = {
  id: number
}

type ProjectWithOnlyIdOnRelation = ProjectWithNoRelation & {
  projectType: OnlyId
  projectStatus: OnlyId
  technicalManager?: OnlyId
  customer: OnlyId
  city: OnlyId
  state: OnlyId
}

export interface CreateProjectRequestDTO extends Omit<ProjectWithOnlyIdOnRelation, 'id'> {
  scopes: OnlyId[]
  payment: ProjectPaymentRequestDTO
}

export interface ReadProjectResponseDTO extends ProjectEntity { }

export interface UpdateProjectRequestDTO extends CreateProjectRequestDTO {
  id: number
}
