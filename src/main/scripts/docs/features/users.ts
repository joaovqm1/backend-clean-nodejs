import { bodySchema, OpenApi, Types } from 'ts-openapi'
import { PathInputDefinition } from 'ts-openapi/lib/openapi/openapi.types'

import { objectUtilities } from '@/main/factories'

import { createCrudApi } from '../endpoints'

export const userType = {
  id: Types.Number({ example: 1, required: true }),
  name: Types.String({ example: 'JOSÉ DA SILVA', required: true }),
  email: Types.String({ example: 'test@test.com', required: true }),
  username: Types.String({ example: 'test', required: true }),
  role: Types.Object({
    properties: {
      id: Types.Number({ example: 1 }),
      name: Types.String({ example: 'ARQUITETO(A)' }),
    }
  }),
  birthdate: Types.String({ example: '1990-01-01', required: true }),
  cpf: Types.String({ example: '11111111111' }),
  token: Types.Uuid({ description: 'Generated token that will be used for future requests' })
}

export const createUpdateType = objectUtilities.cloneObject(userType)
delete createUpdateType.id
delete createUpdateType.role
delete createUpdateType.token

export const query = {
  email: Types.String({ example: 'test@test.com' }),
  username: Types.Date({ example: 'test' }),
  token: Types.Uuid({ description: 'Generated token that will be used for future requests' })
}

export function createUsersApi(openApi: OpenApi): OpenApi {
  openApi.addPath('/users/login', { get: createLogIn() }, true)
  openApi = createCrudApi(openApi, {
    resource: 'users',
    createRequest: createUpdateType,
    query,
    response: userType
  })
  return openApi
}

function createLogIn(): PathInputDefinition {
  return {
    summary: 'LogIn',
    description: 'Endpoint to log user in',
    operationId: 'login-op',
    requestSchema: {
      params: {
        usernameOrEmail: Types.String({
          description: 'Users username or email',
          required: true,
          example: 'test'
        }),
        password: Types.String({
          description: 'Users password',
          required: true,
          example: 'test'
        }),
      },
    },
    responses: {
      200: bodySchema(
        Types.Object({
          description: 'Successful Operation',
          properties: userType
        })
      )
    },
    tags: ['users'],
  }
}

