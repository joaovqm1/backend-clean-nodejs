import { DocumentEntity } from '../entity'

export interface UpdateDocumentRequestDTO extends DocumentEntity { }
export interface UpdateDocumentResponseDTO extends DocumentEntity { }

export interface UpdateDocumentUseCase {
  update: (request: UpdateDocumentRequestDTO) => Promise<UpdateDocumentResponseDTO>
}
