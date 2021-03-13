import { Model } from 'sequelize'

import { ErrorHandler } from '../error-handler'
import { UpdateApi } from '@/infra/repositories/contracts'
interface Params {
  sequelizeModel: any
  errorHandler: ErrorHandler
  userId?: number
}

export class UpdateApiImpl implements UpdateApi {
  constructor(private readonly params: Params) {}

  async update(objectToUpdate: any): Promise<any> {
    const sequelizeObject = await this.params.sequelizeModel.findOne({
      where: { id: objectToUpdate.id },
    })

    for (const key in objectToUpdate) {
      sequelizeObject[key] = objectToUpdate[key]
    }

    if (this.shouldAddUpdaterId()) {
      sequelizeObject.updaterId = this.params.userId
    }
    return this.saveAndHandleErrors(sequelizeObject)
  }

  shouldAddUpdaterId(): boolean {
    return (
      this.params.userId !== undefined &&
      this.params.sequelizeModel.rawAttributes.updaterId
    )
  }

  async saveAndHandleErrors(builtObject: Model): Promise<any> {
    try {
      return await builtObject.save()
    } catch (error) {
      return this.params.errorHandler.handleSequelizeError(error)
    }
  }
}
