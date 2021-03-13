import {
  BaseModelMapper,
  CreateCrudRepository,
  CreateCrudUseCaseImpl,
  DeleteCrudUseCaseImpl,
  ReadCrudRepository,
  ReadCrudUseCaseImpl,
  UpdateCrudRepository,
  UpdateCrudUseCaseImpl,
  DeleteCrudRepository,
} from '@/data'
import {
  BaseCrudViewModelMapper,
  CreateCrudController,
  CrudControllerFacade,
  DeleteCrudController,
} from '@/presentation'

import { DataFactory } from '@/main/factories/data'
import { UtilitiesFactory } from '@/main/factories/utilities'
import { RepositoryFactory } from '@/main/factories/infra'
import {
  AfterCreateCrudUseCase,
  AfterUpdateCrudUseCase,
  CreateCrudUseCase,
  DeleteCrudUseCase,
  ReadCrudUseCase,
  UpdateCrudUseCase,
} from '@/domain'
import { RequestParams } from '../request-params'
import {
  ReadOneCrudController,
  ReadManyCrudController,
  UpdateCrudController,
} from '@/presentation/features/crud'

const modelFactoryImpl = DataFactory.getModelFactory()

interface CrudFactoryParams {
  requestParams: RequestParams
  entityName: string
  modelMapper: BaseModelMapper
  viewModelMapper: BaseCrudViewModelMapper
  uniqueConstraintError?: string
  isPublicTable?: boolean
  isHybridTable?: boolean
  modelName?: string
  officeIdFieldToQuery?: string
}

type UpdateCrudRequestDTO = {
  id: number
}

export class CrudFactory<
  CreateRequestDTO,
  ReadOneResponseDTO,
  ReadManyResponseDTO,
  UpdateRequestDTO extends UpdateCrudRequestDTO
> {
  private readonly sequelizeModel: any
  private createCrudUseCase: CreateCrudUseCase<
  CreateRequestDTO,
  ReadOneResponseDTO
  >

  private afterCreateCrudUseCase: AfterCreateCrudUseCase<ReadOneResponseDTO>
  private afterUpdateCrudUseCase: AfterUpdateCrudUseCase<ReadOneResponseDTO>
  private readCrudUseCase: ReadCrudUseCase<
  ReadOneResponseDTO,
  ReadManyResponseDTO
  >

  constructor(private readonly params: CrudFactoryParams) {
    this.params.modelName = this.params.modelName || this.params.entityName
    this.sequelizeModel = modelFactoryImpl.get(this.params.modelName)
  }

  setCreateCrudUseCase(
    createCrudUseCase: CreateCrudUseCase<CreateRequestDTO, ReadOneResponseDTO>
  ): void {
    this.createCrudUseCase = createCrudUseCase
  }

  setAfterCreateCrudUseCase(
    afterCreateCrudUseCase: AfterCreateCrudUseCase<ReadOneResponseDTO>
  ): void {
    this.afterCreateCrudUseCase = afterCreateCrudUseCase
  }

  setAfterUpdateCrudUseCase(
    afterUpdateCrudUseCase: AfterUpdateCrudUseCase<ReadOneResponseDTO>
  ): void {
    this.afterUpdateCrudUseCase = afterUpdateCrudUseCase
  }

  setReadCrudUseCase(
    readCrudUseCase: ReadCrudUseCase<ReadOneResponseDTO, ReadManyResponseDTO>
  ): void {
    this.readCrudUseCase = readCrudUseCase
  }

  getControllerFacade(): any {
    const createUseCase = this.getCreateUseCase()
    const createCrudController = new CreateCrudController(
      createUseCase,
      this.params.viewModelMapper
    )

    const updateUseCase = this.getUpdateUseCase()
    const updateController = new UpdateCrudController(
      updateUseCase,
      this.params.viewModelMapper
    )

    const readOneUseCase = this.getReadUseCase()
    const readOneController = new ReadOneCrudController(
      readOneUseCase,
      this.params.viewModelMapper
    )

    const readManyUseCase = this.getReadUseCase()
    const readManyController = new ReadManyCrudController(
      readManyUseCase,
      this.params.viewModelMapper
    )

    const deleteUseCase = this.getDeleteUseCase()
    const deleteCrudController = new DeleteCrudController(deleteUseCase)

    return new CrudControllerFacade({
      createController: createCrudController,
      updateController,
      readOneController: readOneController,
      readManyController: readManyController,
      deleteController: deleteCrudController,
    })
  }

  getCreateUseCase(): CreateCrudUseCase<CreateRequestDTO, ReadOneResponseDTO> {
    const createRepository = this.getCreateRepository()
    return (
      this.createCrudUseCase ||
      new CreateCrudUseCaseImpl({
        repository: createRepository,
        modelMapper: this.params.modelMapper,
        afterCreateUseCase: this.afterCreateCrudUseCase,
      })
    )
  }

  getCreateRepository(): CreateCrudRepository {
    return RepositoryFactory.getCreateCrud({
      modelName: this.params.modelName,
      isPublicTable: this.params.isPublicTable,
      userId: this.params.requestParams.userId,
      officeId: this.params.requestParams.officeId,
      uniqueConstraintErrorMessage: this.params.uniqueConstraintError,
    })
  }

  getUpdateUseCase(): UpdateCrudUseCase<UpdateRequestDTO, ReadOneResponseDTO> {
    const updateRepository = this.getUpdateRepository()
    return new UpdateCrudUseCaseImpl<UpdateRequestDTO, ReadOneResponseDTO>({
      repository: updateRepository,
      modelMapper: this.params.modelMapper,
      afterUpdateCrudUseCase: this.afterUpdateCrudUseCase,
    })
  }

  getUpdateRepository(): UpdateCrudRepository {
    return RepositoryFactory.getUpdateCrud({
      modelName: this.params.modelName,
      sequelizeModel: this.sequelizeModel,
      isHybridTable: this.params.isHybridTable,
      userId: this.params.requestParams.officeId,
      isPublicTable: this.params.isPublicTable,
      officeIdFieldToQuery: this.params.officeIdFieldToQuery,
      uniqueConstraintErrorMessage: this.params.uniqueConstraintError,
    })
  }

  getDeleteUseCase(): DeleteCrudUseCase {
    const readRepository = this.getReadRepository()
    const deleteRepository = RepositoryFactory.getDeleteCrud(readRepository, {
      sequelizeModel: this.sequelizeModel,
    })

    return new DeleteCrudUseCaseImpl({
      repository: deleteRepository,
    })
  }

  getDeleteRepository(): DeleteCrudRepository {
    return RepositoryFactory.getDeleteCrud(this.getReadRepository(), {
      sequelizeModel: this.sequelizeModel,
    })
  }

  getReadUseCase(): ReadCrudUseCase<ReadOneResponseDTO, ReadManyResponseDTO> {
    if (this.readCrudUseCase) {
      return this.readCrudUseCase
    } else {
      const repository = this.getReadRepository()

      return new ReadCrudUseCaseImpl<ReadOneResponseDTO, ReadManyResponseDTO>({
        repository,
        filterTransformer: UtilitiesFactory.getFilterTransformer(),
        modelMapper: this.params.modelMapper,
      })
    }
  }

  getReadRepository(): ReadCrudRepository {
    return RepositoryFactory.getReadCrud({
      modelName: this.params.modelName,
      sequelizeModel: this.sequelizeModel,
      isHybridTable: this.params.isHybridTable,
      userId: this.params.requestParams.officeId,
      isPublicTable: this.params.isPublicTable,
      officeIdFieldToQuery: this.params.officeIdFieldToQuery,
    })
  }
}
