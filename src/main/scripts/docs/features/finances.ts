import { OpenApi, Types } from 'ts-openapi'

import { objectUtilities } from '@/main'

import { createCrudApi } from '../endpoints'
import { referenceTypeOnCreateUpdate } from '../utilities'

const data = '2021-04-08'

export const financeApiType = {
  id: Types.Number({ required: true, example: 1 }),
  description: Types.String({ required: true, example: 'PAGAMENTO DE PROJETO AUTOCAD' }),
  customerSupplier: Types.Object({
    properties: {
      id: Types.Number({ example: 1 }),
      name: Types.String({ example: 'SEU JOÃO' })
    },
    required: true
  }),
  status: Types.String({ required: true, example: 'ABERTA OU FINALIZADA' }),
  finishDate: Types.String({ example: data }),
  dateToFinish: Types.String({ example: data }),
  value: Types.Number({ required: true, example: 100 }),
  financeType: Types.Object({
    properties: {
      id: Types.Number({ example: 1 }),
      name: Types.String({ example: 'RECEITA DE PROJETO' })
    },
    required: true
  }),
  financeMethod: Types.Object({
    properties: {
      id: Types.Number({ example: 1 }),
      name: Types.String({ example: 'DINHEIRO' })
    },
    required: true
  })
}

export const createFinanceApiType = objectUtilities.cloneObject(financeApiType)
createFinanceApiType.customerSupplier = referenceTypeOnCreateUpdate()
createFinanceApiType.financeMethod = referenceTypeOnCreateUpdate()
createFinanceApiType.financeMethod = referenceTypeOnCreateUpdate()

const query = {
  status: Types.String({ example: 'ABERTA OU FINALIZADA' }),
  finishDate: Types.String({ example: data }),
}

export function createFinanceApi(openApi: OpenApi): OpenApi {
  for (const resource of ['incomes', 'expenses']) {
    openApi = createCrudApi(openApi, {
      resource,
      createRequest: createFinanceApiType,
      query: query,
      response: financeApiType
    })
  }
  return openApi
}
