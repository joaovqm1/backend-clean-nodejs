import morgan from 'morgan'
import morganBody from 'morgan-body'
import express from 'express'

import { setupRoutes } from './routes'

import dotenv from 'dotenv'
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

setupRoutes(app)

export default app
