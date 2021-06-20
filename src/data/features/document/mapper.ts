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
    return {
      ...request,
      description: request.description.toUpperCase()
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
