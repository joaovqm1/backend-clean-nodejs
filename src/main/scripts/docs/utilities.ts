import { bodySchema, Types } from 'ts-openapi'
import { PathInputDefinition } from 'ts-openapi/lib/openapi/openapi.types'

import { objectUtilities } from '@/main'
import { accessHeaderField, officeIdHeaderField } from '@/main/headers'

export function errorSchema(description: string): any {
  return bodySchema(
    Types.Object({
      description,
      properties: {
        message: Types.String({ description: 'Error message' }),
        code: Types.Integer({ description: 'Error code' }),
      },
    })
  )
}

export function headers(): any {
  return {
    [accessHeaderField]: Types.String({ example: '8rgb96uio', required: true }),
    [officeIdHeaderField]: Types.Number({ example: 1, required: true }),
  }
}

export function referenceTypeOnCreateUpdate(): any {
  return Types.Object({
    properties: {
      id: Types.Number({ example: 1 })
    }
  })
}

export function referencesTypeOnCreateUpdate(): any {
  return Types.Array({
    arrayType: Types.Object({
      properties: {
        id: Types.Number({ example: 1 })
      }
    })
  })
}

const successMessage = 'Successful Operation'

export function createPostPut(params: { method: 'post' | 'put', resource: string, request: any, response?: any }): PathInputDefinition {
  const { method, resource, request: requestBody, response: responseBody } = params

  const copyRequest = objectUtilities.cloneObject(requestBody)
  if (method === 'post') {
    delete copyRequest.id
  }

  const requestSchema: any = {
    headers: headers(),
    body: Types.Object({
      description: `${resource} data to create`,
      properties: {
        data: copyRequest
      }
    })
  }

  if (method === 'put') {
    requestSchema.params = {
      id: Types.Number({ example: 1, required: true })
    }
  }

  return {
    summary: resource,
    description: `Endpoint to ${method} ${resource}`,
    operationId: `${method}-${resource}-op`,
    requestSchema,
    responses: {
      200: bodySchema(
        Types.Object({
          description: successMessage,
          properties: {
            data: responseBody || requestBody
          }
        })
      )
    },
    tags: [resource]
  }
}

export function createPost(params: { resource: string, request: any, response?: any }): PathInputDefinition {
  return createPostPut({ ...params, method: 'post' })
}

export function createPut(params: { resource: string, request: any, response?: any }): PathInputDefinition {
  return createPostPut({ ...params, method: 'put' })
}

export function createGetOne(params: { resource: string, response?: any }): PathInputDefinition {
  const { resource, response } = params

  return {
    summary: resource,
    description: `Endpoint to get one ${resource}`,
    operationId: `get-one-${resource}-op`,
    requestSchema: {
      headers: headers(),
      params: {
        field: Types.String({
          description: 'Replace [field] with the desired field',
          required: true,
          example: 'name'
        }),
        value: Types.String({
          description: 'Replace [value] with the desired value',
          required: true,
          example: 'test'
        }),
      }
    },
    responses: {
      200: bodySchema(
        Types.Object({
          description: successMessage,
          properties: {
            data: response
          }
        })
      )
    },
    tags: [resource]
  }
}

export function createGetMany(params: { resource: string, query: any, response?: any }): PathInputDefinition {
  const { resource, query, response } = params

  return {
    summary: resource,
    description: `Endpoint to get many ${resource}`,
    operationId: `get-many-${resource}-op`,
    requestSchema: {
      headers: headers(),
      query: query,
    },
    responses: {
      200: bodySchema(
        Types.Object({
          description: successMessage,
          properties: {
            items: Types.Array({ arrayType: response })
          }
        })
      )
    },
    tags: [resource],
  }
}

export function createDelete(params: { resource: string }): PathInputDefinition {
  const { resource } = params

  return {
    summary: resource,
    description: `Endpoint to delete ${resource}`,
    operationId: `delete-${resource}-op`,
    requestSchema: {
      headers: headers(),
      params: {
        id: Types.Number({
          description: 'Object id',
          required: true,
          example: 1
        }),
      }
    },
    responses: {
      200: {
        description: 'Item removido com sucesso',
        content: { 'text-plain': {} }
      }
    },
    tags: [resource]
  }
}


