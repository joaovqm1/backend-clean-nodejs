import { Request, Response, Router } from 'express'

import { enviromentConfig } from '@/config'
import { DatabaseApi } from '@/infra/database'
import { ModelFactoryImpl } from '@/infra/database/model-factory'
import { UtilitiesFactory } from '../factories'
import { SequelizeSchemaImpl } from '@/infra'

const modelFactory = new ModelFactoryImpl(
  UtilitiesFactory.getFile(),
  UtilitiesFactory.getString()
)

const sequelizeSchema = new SequelizeSchemaImpl()

const databaseApi = new DatabaseApi(modelFactory, sequelizeSchema)

export default (router: Router): void => {
  if (enviromentConfig.isDevOrTestEnviroment()) {
    router.get(
      '/database/:model/schema/foreingfields',
      async(req: Request, res: Response) => {
        const foreingFields = await databaseApi.getModelForeignFields(
          req.params.model
        )
        res.status(200).json({
          data: foreingFields,
        })
      }
    )
  }
}
