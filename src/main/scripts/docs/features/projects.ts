import { OpenApi, Types } from 'ts-openapi'

import { FinanceStatus } from '@/domain'
import { objectUtilities } from '@/main'

import { createCrudApi } from '../endpoints'
import {
  referencesTypeOnCreateUpdate,
  referenceTypeOnCreateUpdate
} from '../utilities'

const projectType = {
  id: Types.Number({ example: 1, required: true }),
  name: Types.String({ example: 'Empresa do João LTDA ME', required: true }),
  customer: Types.Object({
    properties: {
      id: Types.Number({ example: 1 }),
      name: Types.String({ example: 'JOSÉ DA SILVA' }),
    },
    required: true
  }),
  projectType: Types.Object({
    properties: {
      id: Types.Number({ example: 1 }),
      description: Types.String({ example: 'RESIDENCIAL' }),
    },
    required: true
  }),
  projectStatus: Types.Object({
    properties: {
      id: Types.Number({ example: 1 }),
      description: Types.String({ example: 'EM ANDAMENTO' }),
    },
    required: true
  }),
  technicalManager: Types.Object({
    properties: {
      id: Types.Number({ example: 1 }),
      name: Types.String({ example: 'ANDRÉ' }),
    },
    required: false
  }),
  address: Types.String({ example: 'Rua do João' }),
  postcode: Types.String({ example: '35815000' }),
  addressReference: Types.String({ example: 'Perto da Igreja' }),
  neighborhood: Types.String({ example: 'Centro' }),
  addressNumber: Types.String({ example: '21' }),
  addressComplement: Types.String({ example: 'Casa A' }),
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
  projectScopes: Types.Array({
    arrayType: Types.Object({
      properties: {
        id: Types.Number({ example: 1 }),
        scope: Types.Object({
          properties: {
            id: Types.Number({ example: 1 }),
            description: Types.String({ example: 'QUARTO' })
          }
        })
      }
    })
  }),
  projectPhases: Types.Array({
    arrayType: Types.Object({
      properties: {
        id: Types.Number({ example: 1 }),
        phase: Types.Object({
          properties: {
            id: Types.Number({ example: 1 }),
            description: Types.String({ example: 'LEVANTAMENTO' })
          }
        })
      }
    })
  }),
  finances: Types.Array({
    arrayType: Types.Object({
      properties: {
        id: Types.Number({ example: 1 }),
        description: Types.String({ example: 'ENTRADA DO VALOR TOTAL' }),
        value: Types.Number({ example: 1000 }),
        finishDate: Types.String({ example: '2021-04-10' }),
        dateToFinish: Types.String({ example: '2021-04-15' }),
        status: Types.String({ example: FinanceStatus.FINISHED })
      }
    })
  }),
  startDate: Types.String({ example: '2021-04-01' }),
  dueDate: Types.String({ example: '2021-04-30' }),
  finishDate: Types.String({ example: '2021-04-25' }),
  annotation: Types.String({ example: 'Alguma observação' }),
  totalArea: Types.Number({ example: 15 }),
}

const createUpdateProjectType: any = objectUtilities.cloneObject(projectType)
createUpdateProjectType.customer = referenceTypeOnCreateUpdate()
createUpdateProjectType.projectType = referenceTypeOnCreateUpdate()
createUpdateProjectType.projectStatus = referenceTypeOnCreateUpdate()
createUpdateProjectType.technicalManager = referenceTypeOnCreateUpdate()
createUpdateProjectType.scopes = referencesTypeOnCreateUpdate()
createUpdateProjectType.city = referenceTypeOnCreateUpdate()
createUpdateProjectType.state = referenceTypeOnCreateUpdate()

delete createUpdateProjectType.projectScopes
delete createUpdateProjectType.projectPhases
delete createUpdateProjectType.finances

createUpdateProjectType.payment = Types.Object({
  properties: {
    entry: Types.Number({ example: 1000 }),
    interval: Types.Number({ example: 2 }),
    value: Types.Number({ example: 100 }),
    finances: Types.Array({
      arrayType: Types.Object({
        properties: {
          date: Types.String({ example: '2021-04-01' }),
          value: Types.Number({ example: 100 }),
          finish: Types.String({ example: FinanceStatus.FINISHED })
        }
      })
    })
  },
  required: false
})
createUpdateProjectType.scopes = Types.Array({
  arrayType: Types.Object({
    properties: {
      id: Types.Number({ example: 1 }),
      description: Types.String({ example: 'SALA' }),
    },
  }),
  required: false
})

const query = {
  name: projectType.name
}

export function createProjectApi(openApi: OpenApi): OpenApi {
  openApi = createCrudApi(openApi, {
    resource: 'projects',
    createRequest: createUpdateProjectType,
    query: query,
    response: projectType
  })
  return openApi
}


