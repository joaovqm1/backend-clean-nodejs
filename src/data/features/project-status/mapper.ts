import { BaseModelMapper } from '@/data/mapper'
import {
  CreateProjectStatusRequestDTO,
  ReadProjectStatusResponseDTO,
  UpdateProjectStatusRequestDTO,
} from '@/domain'

import { ProjectStatusModel } from './model'

export class ProjectStatusModelMapper implements BaseModelMapper {
  fromCreateRequestDTOToModel(
    request: CreateProjectStatusRequestDTO
  ): Omit<ProjectStatusModel, 'id'> {
    return this.fromCreateUpdateRequestDTOToModel(request)
  }

  fromCreateUpdateRequestDTOToModel(
    request: CreateProjectStatusRequestDTO | UpdateProjectStatusRequestDTO
  ): Omit<ProjectStatusModel, 'id'> {
    return {
      ...request,
      description: request.description.toUpperCase()
    }
  }

  fromUpdateRequestDTOToModel(
    request: UpdateProjectStatusRequestDTO
  ): ProjectStatusModel {
    return this.fromCreateUpdateRequestDTOToModel(request) as ProjectStatusModel
  }

  fromModelToReadOneResponse(model: ProjectStatusModel): ReadProjectStatusResponseDTO {
    return {
      ...model
    }
  }

  fromModelToReadManyResponse(
    models: ProjectStatusModel[]
  ): ReadProjectStatusResponseDTO[] {
    return models.map(this.fromModelToReadOneResponse)
  }
}
