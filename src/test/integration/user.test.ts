import faker from 'faker'
import fakerBr from 'faker-br'

import { IntegrationTestRunner } from '../utilities/integration-test-runner'
import { User } from '@/infra/database/models'
import { CreateUserRequestViewModel, CreateUserResponseViewModel } from '@/presentation'
import { removeSpecialCharactersFromString } from '../utilities/fakes'

describe('CRUD User', function() {
  const integrationTestRunner = new IntegrationTestRunner({
    feature: 'users',
    getObjectToCreate: getRandomCreateViewModel,
    getExpectedObject: getExpectedObject,
    uniqueAttributes: {
      uniqueName: ['username', 'email']
    },
    uniqueErrorMessage: 'Já existe um usuário cadastrado com esse username ou email',
    sequelizeModel: User,
    shouldCheckUpdaterId: false
  })

  function getRandomCreateViewModel(): CreateUserRequestViewModel {
    return {
      role: {
        id: faker.random.number({
          min: 1,
          max: 10
        })
      },
      cpf: fakerBr.br.cpf({ format: true }),
      email: faker.internet.email(),
      name: faker.name.findName(),
      password: faker.internet.password(),
      username: faker.internet.userName()
    }
  }

  function getExpectedObject(createResponseViewModel: CreateUserResponseViewModel): CreateUserResponseViewModel {
    return {
      ...createResponseViewModel,
      name: createResponseViewModel.name.toUpperCase(),
      cpf: removeSpecialCharactersFromString(createResponseViewModel.cpf),
      role: getRole(createResponseViewModel.role.id)
    }
  }

  function getRole(id: number): any {
    const roles = [{
      id: 1,
      name: 'OWNER',
      alias: 'PROPRIETÁRIO'
    }, {
      id: 2,
      name: 'ADMINISTRATIVEMANAGER',
      alias: 'GERENTE ADMINISTRATIVO'
    }, {
      id: 3,
      name: 'FINANCIALMANAGER',
      alias: 'GERENTE FINANCEIRO'
    }, {
      id: 4,
      name: 'PRODUCATIONMANAGER',
      alias: 'GERENTE DE PRODUÇÃO'
    }, {
      id: 5,
      name: 'INVENTORYMANAGER',
      alias: 'GERENTE DE ESTOQUE'
    }, {
      id: 6,
      name: 'PRODUCTIONWORKER',
      alias: 'COLETOR'
    }, {
      id: 7,
      name: 'MASTERBLENDER',
      alias: 'MASTER BLENDER'
    }, {
      id: 8,
      name: 'COUNTER',
      alias: 'CONTADOR'
    }, {
      id: 9,
      name: 'SALESMAN',
      alias: 'VENDEDOR'
    }, {
      id: 10,
      name: 'TECHNICALMANAGER',
      alias: 'RESPONSÁVEL TÉCNICO'
    }, {
      id: 11,
      name: 'ADMIN',
      alias: 'ADMIN'
    }]

    return roles.find(role => role.id === id)
  }

  integrationTestRunner.run()
})
