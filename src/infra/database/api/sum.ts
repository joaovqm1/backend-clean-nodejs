import { SumCrudRepositoryRequest } from '@/data'
import { SumApi } from '@/infra/repositories/contracts'

import { QueryCreater } from './read'

interface Params {
  sequelizeModel: any
  queryCreater: QueryCreater
}
export class SumApiImpl implements SumApi {
  private readonly sequelizeModel: any
  private readonly queryCreater: QueryCreater

  constructor(params: Params) {
    this.sequelizeModel = params.sequelizeModel
    this.queryCreater = params.queryCreater
  }

  async sum(request: SumCrudRepositoryRequest): Promise<number> {
    const { field, filters = [] } = request
    const query = await this.queryCreater.create(filters)
    return this.sequelizeModel.sum(field, query)
  }
}
