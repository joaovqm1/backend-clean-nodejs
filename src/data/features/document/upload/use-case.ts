import { Storage } from '@/data/contracts'
import {
  documentUploadTreshold,
  UploadFile,
  UploadFileRequestDTO,
  UploadFileResonseDTO,
  UploadTresholdExceedError
} from '@/domain'

import { SumCrudRepository } from '../../crud'

interface Params {
  officeId: number
  storage: Storage
  sumRepository: SumCrudRepository
}

export class UploadFileUseCaseImpl implements UploadFile {
  private readonly storage: Storage
  private readonly officeId: number
  private readonly sumRepository: SumCrudRepository

  constructor(params: Params) {
    this.storage = params.storage
    this.officeId = params.officeId
    this.sumRepository = params.sumRepository
  }

  async upload(request: UploadFileRequestDTO): Promise<UploadFileResonseDTO> {
    await this.validateIfDocumentSizeDoesntExceedMaximum(request.size)

    const key = this.getUniqueFileKey(request)
    const externalPath = await this.storage.upload({ path: request.path, key })

    return {
      mimeType: request.mimetype,
      key,
      size: request.size,
      description: request.description,
      extension: this.getFileExtension(request),
      name: request.originalname,
      path: externalPath
    }
  }

  async validateIfDocumentSizeDoesntExceedMaximum(newSize: number): Promise<void> {
    const currentSize = await this.sumRepository.sum({
      field: 'size'
    })

    if (currentSize + newSize > documentUploadTreshold) {
      throw new UploadTresholdExceedError()
    }
  }

  getUniqueFileKey(request: UploadFileRequestDTO): string {
    const extension = this.getFileExtension(request)
    const description = this.replaceWhiteSpaceFromDescription(request.description)
    return `office_${this.officeId}_${description}.${extension}`
  }

  replaceWhiteSpaceFromDescription(description: string): string {
    return description.replace(/\s/g, '_').trim().toLowerCase()
  }

  getFileExtension(request: UploadFileRequestDTO): string {
    return request.originalname.split('.')[request.originalname.split('.').length - 1]
  }
}
