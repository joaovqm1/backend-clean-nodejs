import { Storage } from '@/data/contracts'
import {
  ReadCrudUseCase,
  ReadDocumentResponseDTO,
  UpdateCrudUseCase,
  UpdateDocumentRequestDTO,
  UpdateDocumentResponseDTO,
  UploadDocumentRequestDTO,
  UploadFile
} from '@/domain'

export class UpdateDocumentUseCaseImpl implements UpdateCrudUseCase<UploadDocumentRequestDTO, UpdateDocumentResponseDTO> {
  private readonly updateCrudUseCase: UpdateCrudUseCase<UpdateDocumentRequestDTO, UpdateDocumentResponseDTO>
  private readonly readUseCase: ReadCrudUseCase<ReadDocumentResponseDTO>
  private readonly storage: Storage
  private readonly uploadFileUseCase: UploadFile

  constructor(params: {
    updateCrudUseCase: UpdateCrudUseCase<UpdateDocumentRequestDTO, UpdateDocumentResponseDTO>
    readUseCase: ReadCrudUseCase<ReadDocumentResponseDTO>
    storage: Storage
    uploadFileUseCase: UploadFile
  }) {
    this.updateCrudUseCase = params.updateCrudUseCase
    this.storage = params.storage
    this.readUseCase = params.readUseCase
    this.uploadFileUseCase = params.uploadFileUseCase
  }

  async update(request: UploadDocumentRequestDTO): Promise<UpdateDocumentResponseDTO> {
    const currentDocument = await this.getCurrentDocument(request.id)

    if (request.file) {
      await this.storage.remove(currentDocument.key)
      const response = await this.uploadFileUseCase.upload({
        ...request.file,
        description: request.description
      })
      return this.updateCrudUseCase.update({
        id: request.id,
        description: request.description,
        project: request.project,
        ...response
      })
    } else {
      return this.updateCrudUseCase.update({
        ...currentDocument,
        description: request.description
      })
    }

  }

  async getCurrentDocument(id: number): Promise<ReadDocumentResponseDTO> {
    return this.readUseCase.getById(id)
  }

  didPathChanged(currentPath: string, newPath: string): boolean {
    return currentPath !== newPath
  }
}
