import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import morganBody from 'morgan-body'
import swaggerUi from 'swagger-ui-express'

import { enviromentConfig } from '../../config'
import openAPIJSON from './open-api.json'
import { setupRoutes } from './routes'

export const envs = dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
})

const app = express()

const shouldLogRequests = process.env.LOG_REQUESTS !== 'false'
if (shouldLogRequests) {
  app.use(
    morgan(':method :url :status :response-time ms - :res[content-length]')
  )
  morganBody(app, {
    maxBodyLength: 1000000,
  })
}

if (enviromentConfig.isDevOrTestEnviroment()) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(openAPIJSON))
}

setupRoutes(app)

export default app
