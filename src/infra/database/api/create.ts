import { Model } from 'sequelize'

import { ErrorHandler } from '../error-handler'
import { CreateApi } from '@/infra/repositories/contracts'

interface Params {
  modelName: string
  sequelizeModel: any
  errorHandler: ErrorHandler
  userId?: number
  userOfficeId?: number
  isPublicTable: boolean
}

export class CreateImpl implements CreateApi {
  private readonly modelName: string
  private readonly sequelizeModel: any
  private readonly errorHandler: ErrorHandler
  private readonly userId?: number
  private readonly userOfficeId?: number
  private readonly isPublicTable: boolean = false

  constructor(params: Params) {
    this.modelName = params.modelName
    this.sequelizeModel = params.sequelizeModel
    this.errorHandler = params.errorHandler
    this.userId = params.userId
    this.userOfficeId = params.userOfficeId
    this.isPublicTable = params.isPublicTable
  }

  async create(object: any, transaction?: any): Promise<any> {
    if (this.shouldAddOfficeIdToNewObject(object)) {
      object.officeId = this.userOfficeId
    }

    if (this.shouldAddCreaterId()) {
      object.createrId = this.userId
    }

    const buildingOptions: any = {
      individualHooks: true,
    }
    if (transaction) {
      buildingOptions.transaction = transaction
    }

    const newSequelizeObject: Model = await this.sequelizeModel.build(
      object,
      buildingOptions
    )

    const newObject: any = await this.saveAndHandleErrors(newSequelizeObject)
    return newObject.dataValues
  }

  private shouldAddOfficeIdToNewObject(object: any): boolean {
    return (
      this.modelName !== 'office' &&
      (!this.isPublicTable || this.modelName === 'user') &&
      object.officeId === undefined
    )
  }

  private shouldAddCreaterId(): boolean {
    return (
      this.userId !== undefined &&
      this.sequelizeModel.rawAttributes.createrId !== undefined
    )
  }

  async saveAndHandleErrors(builtObject: Model): Promise<any> {
    try {
      return await builtObject.save()
    } catch (error) {
      return this.errorHandler.handleSequelizeError(error)
    }
  }
}
