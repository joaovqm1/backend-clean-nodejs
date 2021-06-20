import {
  CreateCrudRepository,
  DeleteCrudRepository,
  ReadCrudRepository,
  SumCrudRepository,
  UpdateCrudRepository,
} from '@/data'
import {
  CreateCrudRepositoryImpl,
  DeleteCrudRepositoryImpl,
  SumCrudRepositoryImpl,
  UpdateCrudRepositoryImpl,
} from '@/infra'
import { ReadCrudRepositoryImpl } from '@/infra/repositories/features/crud/read'

import {
  CreateCrudRepositoryParams,
  DBFactory,
  DeleteCrudRepositoryParams,
  ReadCrudRepositoryParams,
  UpdateCrudRepositoryParams,
} from './db'

interface UpdateReadCrudRepositoryParams
  extends ReadCrudRepositoryParams,
  UpdateCrudRepositoryParams { }

export class RepositoryFactory {
  static getCreateCrud(
    params: CreateCrudRepositoryParams
  ): CreateCrudRepository {
    return new CreateCrudRepositoryImpl(DBFactory.getCreateApi(params))
  }

  static getUpdateCrud(
    params: UpdateReadCrudRepositoryParams
  ): UpdateCrudRepository {
    return new UpdateCrudRepositoryImpl(
      DBFactory.getUpdateApi(params),
      DBFactory.getReadApi(params)
    )
  }

  static getReadCrud(params: ReadCrudRepositoryParams): ReadCrudRepository {
    const readCrudApiImpl = DBFactory.getReadApi(params)
    return new ReadCrudRepositoryImpl(readCrudApiImpl)
  }

  static getSumCrud(params: ReadCrudRepositoryParams): SumCrudRepository {
    const sumApiImpl = DBFactory.getSumApi(params)
    return new SumCrudRepositoryImpl(sumApiImpl)
  }

  static getDeleteCrud(
    getRepository: ReadCrudRepository,
    params: DeleteCrudRepositoryParams
  ): DeleteCrudRepository {
    return new DeleteCrudRepositoryImpl(
      DBFactory.getDeleteApi(params),
      getRepository
    )
  }
}
