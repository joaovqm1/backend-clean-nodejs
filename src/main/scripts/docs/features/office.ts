import { OpenApi, Types } from 'ts-openapi'

import { objectUtilities } from '@/main/factories'

import { createCrudApi } from '../endpoints'
import { referenceTypeOnCreateUpdate } from '../utilities'

export const officeType = {
  id: Types.Number({ example: 1, required: true }),
  name: Types.String({ example: 'EMPRESA DO JOÃO LTDA ME', required: true }),
  tradingName: Types.String({ example: 'ESCRITÓRIO DO JOÃO' }),
  email: Types.String({ example: 'test@test.com' }),
  owner: Types.String({ example: 'JOÃO DA SILVA' }),
  role: Types.Object({
    properties: {
      id: Types.Number({ example: 1 }),
      name: Types.String({ example: 'ARQUITETO(A)' }),
    }
  }),
  birthdate: Types.String({ example: '1990-01-01' }),
  cpf: Types.String({ example: '11111111111' }),
  cnpj: Types.String({ example: '11111111111111' }),
  cellphone: Types.String({ example: '31999999999', required: true }),
  postcode: Types.String({ example: '31111111' }),
  address: Types.String({ example: 'RUA JOSÉ DA LAPA' }),
  addressReference: Types.String({ example: 'PERTO DA IGREJA' }),
  addressComplement: Types.String({ example: 'CASA A' }),
  neighborhood: Types.String({ example: 'CENTRO' }),
  addressNumber: Types.String({ example: '22' }),
  state: Types.Object({
    properties: {
      id: Types.Number({ example: 1 }),
      name: Types.String({ example: 'MINAS GERAIS' }),
    },
    required: true
  }),
  city: Types.Object({
    properties: {
      id: Types.Number({ example: 1 }),
      name: Types.String({ example: 'SÃO SEBASTIÃO DO RIO PRETO' })
    },
    required: true
  }),
}

const createType = {
  name: officeType.name,
  cellphone: officeType.cellphone,
  email: officeType.email,
  city: officeType.city,
  state: officeType.state,
  user: Types.Object({
    properties: {
      username: Types.String({ example: 'test' }),
      password: Types.String({ example: '123456' })
    },
    required: true
  })
}
createType.state = referenceTypeOnCreateUpdate()
createType.city = referenceTypeOnCreateUpdate()

const updateType = objectUtilities.cloneObject(officeType)
delete updateType.role
updateType.state = referenceTypeOnCreateUpdate()
updateType.city = referenceTypeOnCreateUpdate()

export function createOfficesApi(openApi: OpenApi): OpenApi {
  openApi = createCrudApi(openApi, {
    resource: 'offices',
    createRequest: createType,
    updateRequest: updateType,
    query: {},
    response: officeType
  })
  return openApi
}

