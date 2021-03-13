import { } from '@/data'
import {
  CreateApi,
  CreateImpl,
  ErrorHandlerImpl,
  SequelizeSchemaImpl,
  ReadApiImpl,
  ReadApi,
  DeleteApiImpl,
  DeleteApi,
  UpdateApi,
  UpdateApiImpl,
  QueryCreater,
} from '@/infra'
import { DataFactory } from '../data'
import { UtilitiesFactory } from '../utilities'

const modelFactoryImpl = DataFactory.getModelFactory()

export interface CreateCrudRepositoryParams {
  modelName: string
  uniqueConstraintErrorMessage?: string
  isPublicTable?: boolean
  officeId?: number
  userId?: number
}

export interface UpdateCrudRepositoryParams {
  modelName: string
  uniqueConstraintErrorMessage?: string
  isPublicTable?: boolean
  officeId?: number
  userId?: number
}

export interface ReadCrudRepositoryParams {
  modelName: string
  sequelizeModel: any
  isPublicTable?: boolean
  isHybridTable?: boolean
  currentUser?: any
  officeIdFieldToQuery?: string
  userId?: number
}

export interface DeleteCrudRepositoryParams {
  sequelizeModel: any
}

const sequelizeSchemaImpl = new SequelizeSchemaImpl()

export class DBFactory {
  static getCreateApi(params: CreateCrudRepositoryParams): CreateApi {
    return new CreateImpl({
      modelName: params.modelName,
      sequelizeModel: modelFactoryImpl.get(params.modelName),
      errorHandler: new ErrorHandlerImpl(params.uniqueConstraintErrorMessage),
      userId: params.userId,
      userOfficeId: params.officeId,
      isPublicTable: params.isPublicTable !== undefined,
    })
  }

  static getUpdateApi(params: UpdateCrudRepositoryParams): UpdateApi {
    return new UpdateApiImpl({
      errorHandler: new ErrorHandlerImpl(params.uniqueConstraintErrorMessage),
      sequelizeModel: modelFactoryImpl.get(params.modelName),
      userId: params.userId
    })
  }

  static getReadApi(params: ReadCrudRepositoryParams): ReadApi {
    return new ReadApiImpl({
      sequelizeModel: params.sequelizeModel,
      queryCreater: this.getQueryCreator(params)
    })
  }

  static getQueryCreator(params: ReadCrudRepositoryParams): QueryCreater {
    return new QueryCreater({
      modelName: params.modelName,
      sequelizeModel: params.sequelizeModel,
      sequelizeSchema: sequelizeSchemaImpl,
      modelFactory: DataFactory.getModelFactory(),
      stringUtilities: UtilitiesFactory.getString(),
      currentUser: params.currentUser,
      userId: params.userId,
      isPublicTable: params.isPublicTable,
      isHybridTable: params.isHybridTable,
      officeIdFieldToQuery: params.officeIdFieldToQuery
    })
  }

  static getDeleteApi(params: DeleteCrudRepositoryParams): DeleteApi {
    return new DeleteApiImpl(params.sequelizeModel, new ErrorHandlerImpl())
  }
}
