/* eslint-disable @typescript-eslint/no-var-requires */
import { connectionUrl } from '@/infra'

import { enviromentConfig, serverConfig } from '../config'
import app from '../main/config/app'

require('dotenv').config({
  path: '.env.defaults'
})
require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

if (enviromentConfig.isProductionEnvironment()) {
  require('module-alias/register')
}

app.listen(serverConfig.port, () => {
  console.log(`Server running at: http://localhost:${serverConfig.port}`)
  console.log(`Connected to: ${connectionUrl}`)
  if (enviromentConfig.isDevOrTestEnviroment()) {
    console.log(`Docs at: http://localhost:${serverConfig.port}/docs`)
  }
}
)
