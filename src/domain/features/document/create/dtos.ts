import { DocumentEntity } from '../entity'
import { UploadFileRequestDTO } from '../upload'
export interface CreateDocumentRequestDTO extends
  Omit<DocumentEntity, 'id'> {
}

export interface UploadDocumentRequestDTO extends
  Pick<DocumentEntity, 'description'> {
  id?: number
  file: Omit<UploadFileRequestDTO, 'description'>
}

export interface CreateDocumentResponseDTO extends DocumentEntity { }
