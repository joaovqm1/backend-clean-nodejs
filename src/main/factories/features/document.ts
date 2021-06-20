import { CreateDocumentUseCaseImpl, DocumentModelMapper, UpdateDocumentUseCaseImpl } from '@/data'
import { UploadFileUseCaseImpl } from '@/data/features/document/upload/use-case'
import {
  ReadDocumentResponseDTO,
  UploadFile,
} from '@/domain'
import { DocumentViewModelMapper, GenericController } from '@/presentation'

import { RequestParamsWithUser } from '../request-params'
import { getStorage } from '../third-party'
import { CrudFactory } from './crud'

export class DocumentFactory {
  private readonly documentCrudFactory: CrudFactory<any, ReadDocumentResponseDTO, ReadDocumentResponseDTO, any>
  private readonly officeId: number

  constructor(readonly requestParams: RequestParamsWithUser) {
    this.documentCrudFactory = new CrudFactory<any, ReadDocumentResponseDTO, ReadDocumentResponseDTO, any>({
      requestParams,
      entityName: 'document',
      modelMapper: new DocumentModelMapper(),
      viewModelMapper: new DocumentViewModelMapper(),
      uniqueConstraintError: 'Já existe um documento cadastrado com esse nome',
    })
    this.officeId = requestParams.officeId

    const uploadFileUseCase = this.getUploadUseCase()

    const createUseCase = new CreateDocumentUseCaseImpl({
      createCrudUseCase: this.documentCrudFactory.getCreateUseCase(),
      uploadFileUseCase
    })

    this.documentCrudFactory.setCreateCrudUseCase(createUseCase)

    const updateUseCase = new UpdateDocumentUseCaseImpl({
      readUseCase: this.documentCrudFactory.getReadUseCase(),
      storage: getStorage(),
      updateCrudUseCase: this.documentCrudFactory.getUpdateUseCase(),
      uploadFileUseCase
    })

    this.documentCrudFactory.setUpdateCrudUseCase(updateUseCase)
  }

  getControllerFacade(): any {
    return {
      ...this.documentCrudFactory.getControllerFacade(),
      upload: new GenericController({ useCase: this.getUploadUseCase() })
    }
  }

  getUploadUseCase(): UploadFile {
    return new UploadFileUseCaseImpl({
      storage: getStorage(),
      officeId: this.officeId,
      sumRepository: this.documentCrudFactory.getSumRepository()
    })
  }
}
