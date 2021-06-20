import { BaseModelMapper } from '@/data/mapper'
import {
  CreateProjectTypeRequestDTO,
  ReadProjectTypeResponseDTO,
  UpdateProjectTypeRequestDTO,
} from '@/domain'

import { ProjectTypeModel } from './model'

export class ProjectTypeModelMapper implements BaseModelMapper {
  fromCreateRequestDTOToModel(
    request: CreateProjectTypeRequestDTO
  ): Omit<ProjectTypeModel, 'id'> {
    return this.fromCreateUpdateRequestDTOToModel(request)
  }

  fromCreateUpdateRequestDTOToModel(
    request: CreateProjectTypeRequestDTO | UpdateProjectTypeRequestDTO
  ): ProjectTypeModel | Omit<ProjectTypeModel, 'id'> {
    return {
      ...request,
      description: request.description.toUpperCase()
    }
  }

  fromUpdateRequestDTOToModel(
    request: UpdateProjectTypeRequestDTO
  ): ProjectTypeModel {
    return this.fromCreateUpdateRequestDTOToModel(request) as ProjectTypeModel
  }

  fromModelToReadOneResponse(model: ProjectTypeModel): ReadProjectTypeResponseDTO {
    return {
      ...model
    }
  }

  fromModelToReadManyResponse(
    models: ProjectTypeModel[]
  ): ReadProjectTypeResponseDTO[] {
    return models.map(this.fromModelToReadOneResponse)
  }
}
