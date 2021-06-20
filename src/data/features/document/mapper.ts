import { BaseModelMapper } from '@/data/mapper'
import {
  CreateDocumentRequestDTO,
  ReadDocumentResponseDTO,
  UpdateDocumentRequestDTO,
} from '@/domain'

import { DocumentModel } from './model'

export class DocumentModelMapper implements BaseModelMapper {
  fromCreateRequestDTOToModel(
    request: Omit<CreateDocumentRequestDTO, 'file'>
  ): Omit<DocumentModel, 'id'> {
    return this.fromCreateUpdateRequestDTOToModel(request)
  }

  fromCreateUpdateRequestDTOToModel(request: any): any {
    const projectId = request.project?.id
    delete request.project
    // const projectScopeId = request.projectScope?.id
    // delete request.projectScope
    // const projectPhaseId = request.projectPhase?.id
    // delete request.projectPhase

    return {
      ...request,
      // projectId,
      // projectScopeId,
      // projectPhaseId,
      description: request.description.toUpperCase(),
      projectId
    }
  }

  fromModelToReadOneResponse(model: DocumentModel): ReadDocumentResponseDTO {
    return model
  }

  fromModelToReadManyResponse(
    models: DocumentModel[]
  ): ReadDocumentResponseDTO[] {
    return models.map(this.fromModelToReadOneResponse)
  }

  fromUpdateRequestDTOToModel(
    request: UpdateDocumentRequestDTO
  ): DocumentModel {
    return this.fromCreateUpdateRequestDTOToModel(request)
  }
}
