import {
  AfterCreateCrudUseCaseImpl,
  AfterUpdateCrudUseCaseImpl,
  BaseModelMapper,
  CreateCrudRepository,
  CreateCrudUseCaseImpl,
  DeleteCrudRepository,
  DeleteCrudUseCaseImpl,
  ReadCrudRepository,
  ReadCrudUseCaseImpl,
  SumCrudRepository,
  UpdateCrudRepository,
  UpdateCrudUseCaseImpl,
} from '@/data'
import {
  AfterCreateCrudUseCase,
  AfterUpdateCrudUseCase,
  CreateCrudUseCase,
  DeleteCrudUseCase,
  Filter,
  ReadCrudUseCase,
  UpdateCrudUseCase,
} from '@/domain'
import { DataFactory } from '@/main/factories/data'
import { RepositoryFactory } from '@/main/factories/infra'
import {
  BaseCrudViewModelMapper,
  GenericController,
} from '@/presentation'

import { RequestParams } from '../request-params'

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
  fieldsToIncludeOnQuery?: string[]
  defaultGetManyFilters?: Filter[]
}

type UpdateCrudRequestDTO = {
  id: number
}
export class CrudFactory<
  CreateRequestDTO,
  ReadOneResponseDTO,
  ReadManyResponseDTO,
  UpdateRequestDTO extends UpdateCrudRequestDTO> {
  private readonly sequelizeModel: any
  private createCrudUseCase: CreateCrudUseCase<CreateRequestDTO, ReadOneResponseDTO>
  private updateCrudUseCase: UpdateCrudUseCase<UpdateRequestDTO, ReadOneResponseDTO>
  private afterCreateCrudUseCase: AfterCreateCrudUseCase<ReadOneResponseDTO>
  private afterUpdateCrudUseCase: AfterUpdateCrudUseCase<ReadOneResponseDTO>
  private readCrudUseCase: ReadCrudUseCase<ReadOneResponseDTO, ReadManyResponseDTO>
  private readonly fieldsToIncludeOnQuery?: string[]
  private readonly defaultGetManyFilters?: Filter[]

  constructor(private readonly params: CrudFactoryParams) {
    this.params.modelName = this.params.modelName || this.params.entityName
    this.sequelizeModel = modelFactoryImpl.get(this.params.modelName)
    this.fieldsToIncludeOnQuery = params.fieldsToIncludeOnQuery
    this.defaultGetManyFilters = params.defaultGetManyFilters
  }

  setCreateCrudUseCase(createCrudUseCase: CreateCrudUseCase<CreateRequestDTO, ReadOneResponseDTO>): void {
    this.createCrudUseCase = createCrudUseCase
  }

  setAfterCreateCrudUseCase(afterCreateCrudUseCase: AfterCreateCrudUseCase<ReadOneResponseDTO>): void {
    this.afterCreateCrudUseCase = afterCreateCrudUseCase
  }

  setUpdateCrudUseCase(updateCrudUseCase: UpdateCrudUseCase<UpdateRequestDTO, ReadOneResponseDTO>): void {
    this.updateCrudUseCase = updateCrudUseCase
  }

  setAfterUpdateCrudUseCase(afterUpdateCrudUseCase: AfterUpdateCrudUseCase<ReadOneResponseDTO>): void {
    this.afterUpdateCrudUseCase = afterUpdateCrudUseCase
  }

  setReadCrudUseCase(readCrudUseCase: ReadCrudUseCase<ReadOneResponseDTO, ReadManyResponseDTO>): void {
    this.readCrudUseCase = readCrudUseCase
  }

  getControllerFacade(): any {
    const createUseCase = this.getCreateUseCase()
    const createCrudController = new GenericController({
      useCase: createUseCase,
      mapRequest: this.params.viewModelMapper.fromCreateRequestViewModelToCreateRequestDTO?.bind(this.params.viewModelMapper),
      mapResponse: this.params.viewModelMapper.fromCreateResponseDTOToCreateResponseViewModel?.bind(this.params.viewModelMapper)
    })

    const updateUseCase = this.getUpdateUseCase()
    const updateController = new GenericController({
      useCase: updateUseCase,
      mapRequest: this.params.viewModelMapper.fromUpdateRequestViewModelToUpdateRequestDTO?.bind(this.params.viewModelMapper),
      mapResponse: this.params.viewModelMapper.fromUpdateResponseDTOToUpdateResponseViewModel?.bind(this.params.viewModelMapper)
    })

    const reaUseCase = this.getReadUseCase()
    const readOneController = new GenericController({
      useCase: reaUseCase,
      mapRequest: this.params.viewModelMapper.fromReadRequestViewModelToFilters.bind(this.params.viewModelMapper),
      mapResponse: this.params.viewModelMapper.fromReadOneResponseDTOToReadResponseOneViewModel.bind(this.params.viewModelMapper)
    })

    const readManyController = new GenericController({
      useCase: reaUseCase,
      mapRequest: this.params.viewModelMapper.fromReadRequestViewModelToFilters.bind(this.params.viewModelMapper),
      mapResponse: this.params.viewModelMapper.fromReadManyResponseDTOToReadResponseOneViewModel.bind(this.params.viewModelMapper),
      responseFieldToMap: 'items'
    })

    const deleteUseCase = this.getDeleteUseCase()
    const deleteCrudController = new GenericController({
      useCase: deleteUseCase
    })

    return {
      create: createCrudController,
      update: updateController,
      readOne: readOneController,
      readMany: readManyController,
      delete: deleteCrudController,
    }
  }

  getCreateUseCase(): CreateCrudUseCase<CreateRequestDTO, ReadOneResponseDTO> {
    const createRepository = this.getCreateRepository()
    return (
      this.createCrudUseCase ||
      new CreateCrudUseCaseImpl({
        repository: createRepository,
        modelMapper: this.params.modelMapper,
        afterCreateUseCase: this.getAfterCreateUseCase(),
      })
    )
  }

  getAfterCreateUseCase(): AfterCreateCrudUseCase<ReadOneResponseDTO> {
    return this.afterCreateCrudUseCase || new AfterCreateCrudUseCaseImpl<ReadOneResponseDTO>({
      readCrudUseCase: this.getReadUseCase(),
      fieldsToInclude: this.fieldsToIncludeOnQuery
    })
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
    return this.updateCrudUseCase || new UpdateCrudUseCaseImpl<UpdateRequestDTO, ReadOneResponseDTO>({
      repository: updateRepository,
      modelMapper: this.params.modelMapper,
      afterUpdateCrudUseCase: this.getAfterUpdateUseCase(),
    })
  }

  getAfterUpdateUseCase(): AfterUpdateCrudUseCase<ReadOneResponseDTO> {
    return this.afterUpdateCrudUseCase || new AfterUpdateCrudUseCaseImpl<ReadOneResponseDTO>({
      readCrudUseCase: this.getReadUseCase(),
      fieldsToInclude: this.fieldsToIncludeOnQuery
    })
  }

  getUpdateRepository(): UpdateCrudRepository {
    return RepositoryFactory.getUpdateCrud({
      modelName: this.params.modelName,
      sequelizeModel: this.sequelizeModel,
      isHybridTable: this.params.isHybridTable,
      userId: this.params.requestParams.userId,
      officeId: this.params.requestParams.officeId,
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
        modelMapper: this.params.modelMapper,
        defaultGetManyFilters: this.defaultGetManyFilters
      })
    }
  }

  getReadRepository(): ReadCrudRepository {
    return RepositoryFactory.getReadCrud({
      modelName: this.params.modelName,
      sequelizeModel: this.sequelizeModel,
      isHybridTable: this.params.isHybridTable,
      userId: this.params.requestParams.userId,
      officeId: this.params.requestParams.officeId,
      isPublicTable: this.params.isPublicTable,
      officeIdFieldToQuery: this.params.officeIdFieldToQuery,
    })
  }

  getSumRepository(): SumCrudRepository {
    return RepositoryFactory.getSumCrud({
      modelName: this.params.modelName,
      sequelizeModel: this.sequelizeModel,
      isHybridTable: this.params.isHybridTable,
      userId: this.params.requestParams.userId,
      officeId: this.params.requestParams.officeId,
      isPublicTable: this.params.isPublicTable,
      officeIdFieldToQuery: this.params.officeIdFieldToQuery,
    })
  }
}
