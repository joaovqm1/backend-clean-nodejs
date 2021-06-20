import {
  CreateCrudUseCase,
  CreateDocumentRequestDTO,
  ReadDocumentResponseDTO,
  UploadDocumentRequestDTO,
  UploadFile
} from '@/domain'

export class CreateDocumentUseCaseImpl implements CreateCrudUseCase<UploadDocumentRequestDTO, ReadDocumentResponseDTO> {
  private readonly createCrudUseCase: CreateCrudUseCase<CreateDocumentRequestDTO, ReadDocumentResponseDTO>
  private readonly uploadFileUseCase: UploadFile

  constructor(params: {
    createCrudUseCase: CreateCrudUseCase<CreateDocumentRequestDTO, ReadDocumentResponseDTO>
    uploadFileUseCase: UploadFile
  }) {
    this.createCrudUseCase = params.createCrudUseCase
    this.uploadFileUseCase = params.uploadFileUseCase
  }

  async create(request: UploadDocumentRequestDTO): Promise<ReadDocumentResponseDTO> {
    const response = await this.uploadFileUseCase.upload({
      ...request.file,
      description: request.description
    })

    return this.createCrudUseCase.create({
      description: request.description,
      project: request.project,
      ...response
    })
  }
}
