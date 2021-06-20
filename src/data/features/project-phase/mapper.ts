import { BaseModelMapper } from '@/data/mapper'
import {
  CreateProjectPhaseRequestDTO,
  ReadProjectPhaseResponseDTO,
  UpdateProjectPhaseRequestDTO,
} from '@/domain'

import { ProjectPhaseModel } from './model'

export class ProjectPhaseModelMapper implements BaseModelMapper {
  fromCreateRequestDTOToModel(request: CreateProjectPhaseRequestDTO): Omit<ProjectPhaseModel, 'id'> {
    return this.fromCreateUpdateRequestDTOToModel(request)
  }

  fromCreateUpdateRequestDTOToModel(request: CreateProjectPhaseRequestDTO | UpdateProjectPhaseRequestDTO): Omit<ProjectPhaseModel, 'id'> {
    const copyRequest = { ...request }

    const phaseId = copyRequest.phase.id
    const projectId = copyRequest.project?.id

    return {
      ...request,
      phaseId,
      projectId
    }
  }

  fromUpdateRequestDTOToModel(request: UpdateProjectPhaseRequestDTO): ProjectPhaseModel {
    return this.fromCreateUpdateRequestDTOToModel(request) as ProjectPhaseModel
  }

  fromModelToReadOneResponse(model: ProjectPhaseModel): ReadProjectPhaseResponseDTO {
    const copyModel = { ...model }
    delete copyModel.phaseId
    delete copyModel.projectId

    return copyModel
  }

  fromModelToReadManyResponse(models: ProjectPhaseModel[]): ReadProjectPhaseResponseDTO[] {
    return models.map(this.fromModelToReadOneResponse)
  }
}
