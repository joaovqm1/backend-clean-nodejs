import { OpenApi, Types } from 'ts-openapi'

import { objectUtilities } from '@/main'

import { createCrudApi } from '../endpoints'
import {
  referenceTypeOnCreateUpdate
} from '../utilities'

const customerSuppluierType = {
  id: Types.Number({ example: 1, required: true }),
  name: Types.String({ example: 'Empresa do João LTDA ME', required: true }),
  tradingName: Types.String({ example: 'Comércio do Seu João' }),
  email: Types.String({ example: 'test@test.com' }),
  profile: Types.String({ example: 'CONTATO' }),
  type: Types.String({ example: 'JURÍDICO', required: true }),
  cellphone1: Types.String({ example: '31982388860' }),
  cellphone2: Types.String({ example: '31982388861' }),
  phone1: Types.String({ example: '3138675127' }),
  phone2: Types.String({ example: '3138675128' }),
  website: Types.String({ example: 'https://empresadojoao.com.br' }),
  birthdate: Types.String({ example: '1992-07-30' }),
  cpfCnpj: Types.String({ example: '11111111111111' }),
  identityCard: Types.String({ example: '111111111111' }),
  address1: Types.String({ example: 'Rua do João' }),
  address2: Types.String({ example: '' }),
  postcode: Types.String({ example: '35815000' }),
  addressReference: Types.String({ example: 'Perto da Igreja' }),
  state: Types.Object({
    properties: {
      id: Types.Number({ example: 1 }),
      name: Types.String({ example: 'MINAS GERAIS' }),
    }
  }),
  city: Types.Object({
    properties: {
      id: Types.Number({ example: 1 }),
      name: Types.String({ example: 'SÃO SEBASTIÃO DO RIO PRETO' })
    }
  }),
  neighborhood: Types.String({ example: 'Centro' }),
  addressNumber: Types.String({ example: '21' }),
  addressComplement: Types.String({ example: 'Casa A' }),
  additionalInfo: Types.String({ example: 'Outras Informações' }),
  bank: Types.Object({
    properties: {
      id: Types.Number({ example: 1 }),
      name: Types.String({ example: 'BANCO DO BRASIL' })
    }
  }),
  bankBranch: Types.String({ example: '1243-8' }),
  bankAccount: Types.String({ example: '12454-1' }),
  bankAccountType: Types.String({ example: 'CORRENTE' })
}

const createUpdateCustomerSupplierType = objectUtilities.cloneObject(customerSuppluierType)
createUpdateCustomerSupplierType.bank = referenceTypeOnCreateUpdate()
createUpdateCustomerSupplierType.state = referenceTypeOnCreateUpdate()
createUpdateCustomerSupplierType.city = referenceTypeOnCreateUpdate()

const query = {
  name: customerSuppluierType.name,
  type: customerSuppluierType.type
}

export function createCustomerSupplierApi(openApi: OpenApi): OpenApi {
  for (const resource of ['customers', 'suppliers']) {
    openApi = createCrudApi(openApi, {
      resource,
      createRequest: createUpdateCustomerSupplierType,
      query: query,
      response: customerSuppluierType
    })
  }
  return openApi
}


