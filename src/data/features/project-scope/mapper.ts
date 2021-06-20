import { BaseModelMapper } from '@/data/mapper'
import {
  CreateProjectScopeRequestDTO,
  ReadProjectScopeResponseDTO,
  UpdateProjectScopeRequestDTO,
} from '@/domain'

import { ProjectScopeModel } from './model'

export class ProjectScopeModelMapper implements BaseModelMapper {
  fromCreateRequestDTOToModel(request: CreateProjectScopeRequestDTO): Omit<ProjectScopeModel, 'id'> {
    return this.fromCreateUpdateRequestDTOToModel(request)
  }

  fromCreateUpdateRequestDTOToModel(request: CreateProjectScopeRequestDTO | UpdateProjectScopeRequestDTO): Omit<ProjectScopeModel, 'id'> {
    const copyRequest = { ...request }

    const scopeId = copyRequest.scope.id
    const projectId = copyRequest.project.id

    return {
      ...request,
      scopeId,
      projectId
    }
  }

  fromUpdateRequestDTOToModel(request: UpdateProjectScopeRequestDTO): ProjectScopeModel {
    return this.fromCreateUpdateRequestDTOToModel(request) as ProjectScopeModel
  }

  fromModelToReadOneResponse(model: ProjectScopeModel): ReadProjectScopeResponseDTO {
    const copyModel = { ...model }
    delete copyModel.scopeId
    delete copyModel.projectId

    return copyModel
  }

  fromModelToReadManyResponse(models: ProjectScopeModel[]): ReadProjectScopeResponseDTO[] {
    return models.map(this.fromModelToReadOneResponse)
  }
}
