import { ErrorHandler } from '../error-handler'
import { DeleteApi } from '@/infra/repositories/contracts'
import { sequelize } from '@/infra/database/sequelize'

export class DeleteApiImpl implements DeleteApi {
  constructor(
    private readonly sequelizeModel: any,
    private readonly errorHandler: ErrorHandler
  ) {}

  async deleteMany(ids: number[]): Promise<any> {
    try {
      const objectsDestroied = []
      await sequelize.transaction({}, async(transaction: any) => {
        for (const id of ids) {
          objectsDestroied.push(await this.delete(id, transaction))
        }
      })
      return objectsDestroied
    } catch (error) {
      return this.errorHandler.handleSequelizeError(error)
    }
  }

  async delete(id: number, transaction?: any): Promise<any> {
    try {
      const object = await this.sequelizeModel.findOne({ where: { id } })
      if (transaction) {
        await object.destroy({ transaction })
      } else {
        await object.destroy()
      }
      return object
    } catch (error) {
      return this.errorHandler.handleSequelizeError(error)
    }
  }
}
