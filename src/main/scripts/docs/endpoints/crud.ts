import { OpenApi } from 'ts-openapi'

import {
  createDelete,
  createGetMany,
  createGetOne,
  createPost,
  createPut
} from '../utilities'

interface Params {
  resource: string
  createRequest: any
  updateRequest?: any
  response: any
  query: any
}

export function createCrudApi(openApi: OpenApi, params: Params): OpenApi {
  const { resource, createRequest, updateRequest, response, query } = params
  openApi.addPath(`crud/${resource}`, {
    post: createPost({ resource, request: createRequest, response }),
  }, true)
  openApi.addPath(`crud/${resource}/:id`, {
    put: createPut({ resource, request: updateRequest || createRequest, response }),
  }, true)
  openApi.addPath(`crud/${resource}`, {
    get: createGetMany({ resource, query, response })
  }, true)
  openApi.addPath(`crud/${resource}/:field/:value`, {
    get: createGetOne({ resource, response })
  }, true)
  openApi.addPath(`crud/${resource}/:id`, {
    delete: createDelete({ resource })
  }, true)
  return openApi
}
