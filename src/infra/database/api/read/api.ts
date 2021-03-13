import { ReadApi } from '@/infra/repositories/contracts'
import { Filter } from '@/data/contracts'
import { GetManyResult } from '@/domain'
import { QueryCreater } from './query'

interface Params {
  sequelizeModel: any
  queryCreater: QueryCreater
}
export class ReadApiImpl implements ReadApi {
  private readonly sequelizeModel: any
  private readonly queryCreater: QueryCreater

  constructor(params: Params) {
    this.sequelizeModel = params.sequelizeModel
    this.queryCreater = params.queryCreater
  }

  async get(filters: any[]): Promise<any> | undefined {
    const object: any = await this.getOne(filters)
    return object?.toJSON()
  }

  async getOne(filters: Filter[]): Promise<any> | undefined {
    const query = this.queryCreater.create(filters)
    return this.sequelizeModel.findOne(query)
  }

  async getMany(filters: Filter[]): Promise<GetManyResult> {
    const offset = filters.filter((filter) => filter.name === 'offset')[0]
    if (offset) {
      return this.getManyWithPagination(filters)
    } else {
      const query = this.queryCreater.create(filters)
      const objects: any[] = await this.sequelizeModel.findAll(query)
      return {
        items: objects.map((object) => object.toJSON()),
      }
    }
  }

  async getManyWithPagination(filters: Filter[]): Promise<GetManyResult> {
    const query = this.queryCreater.create(filters)

    const offset = filters.filter((filter) => filter.name === 'offset')[0]
    const limit = filters.filter((filter) => filter.name === 'limit')[0]

    query.limit = limit ? Number(limit.value) : 10
    query.offset = offset ? Number(offset.value) * query.limit : 0

    const data = await this.sequelizeModel.findAndCountAll(query)

    const { count: totalItems, rows: items } = data
    const currentPage = offset ? Number(offset.value) : 0
    const totalPages = Math.ceil(totalItems / query.limit)

    return {
      totalItems,
      items,
      currentPage,
      totalPages,
    }
  }
}
