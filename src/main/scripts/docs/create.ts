import { OpenApi } from 'ts-openapi'

import { serverConfig } from '@/config'
import { fileUtilities } from '@/main'

import {
  createCustomerSupplierApi,
  createFinanceApi,
  createOfficesApi,
  createProjectApi,
  createTaskApi,
  createUsersApi
} from './features'

let openApi = new OpenApi(
  '1.0.0',
  'Projetei API',
  'Projetei Backend API',
  'contato@projetei.com.br'
)

openApi.setServers([
  { url: `${serverConfig.url}/api` }
])

openApi.setLicense(
  'Apache 2.0',
  'http://www.apache.org/licenses/LICENSE-2.0.html',
  'http://swagger.io/terms/'
)

openApi = createCustomerSupplierApi(openApi)
openApi = createFinanceApi(openApi)
openApi = createOfficesApi(openApi)
openApi = createProjectApi(openApi)
openApi = createTaskApi(openApi)
openApi = createUsersApi(openApi)

fileUtilities.create('src/main/config/open-api.json', JSON.stringify(openApi.generateJson()))