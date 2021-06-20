import { OpenApi, Types } from 'ts-openapi'

import { objectUtilities } from '@/main'

import { createCrudApi } from '../endpoints'
import {
  referenceTypeOnCreateUpdate
} from '../utilities'

export const taskType = {
  id: Types.Number({ example: 1, required: true }),
  title: Types.String({ example: 'Cortar cabelo', required: true }),
  description: Types.String({ example: 'Já está na hora' }),
  status: Types.String({ example: 'ABERTO ou FINALIZADO', required: true }),
  startDate: Types.Date({ example: '2021-04-04', required: true }),
  finishDate: Types.Date({ example: '2021-04-05' }),
  startTime: Types.DateTime({ example: '18:00' }),
  finishTime: Types.DateTime({ example: '18:30' }),
  resposible: Types.Object({
    properties: {
      id: Types.Number({ example: 1 }),
      name: Types.String({ example: 'JOÃO' })
    }
  }),

}

export const createUpdateTaskType = objectUtilities.cloneObject(taskType)
createUpdateTaskType.resposible = referenceTypeOnCreateUpdate()

export const taskQuery = {
  status: Types.String({ example: 'ABERTO' }),
  startDate: Types.Date({ example: '2021-04-05' })
}

export function createTaskApi(openApi: OpenApi): OpenApi {
  openApi = createCrudApi(openApi, {
    resource: 'tasks',
    createRequest: createUpdateTaskType,
    query: taskQuery,
    response: taskType
  })
  return openApi
}