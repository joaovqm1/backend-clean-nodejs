import faker from 'faker'
import fakerBr from 'faker-br'

import { IntegrationTestRunner } from '@/test/utilities/integration-test-runner'
import { User } from '@/infra/database/models'
import { CreateUserRequestViewModel, CreateUserResponseViewModel } from '@/presentation'
import { removeSpecialCharactersFromString } from '@/test/utilities/fakes'

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
    optionalFields: ['cpf', 'birthdate'],
    shouldCheckUpdaterId: false
  })

  function getRandomCreateViewModel(): { viewModel: CreateUserRequestViewModel } {
    return {
      viewModel: {
        role: {
          id: faker.datatype.number({
            min: 1,
            max: 2
          })
        },
        cpf: fakerBr.br.cpf({ format: true }),
        email: faker.internet.email(),
        name: faker.name.findName(),
        password: faker.internet.password(),
        username: faker.internet.userName()
      }
    }
  }

  function getExpectedObject(params: { responseViewModel: CreateUserResponseViewModel }): CreateUserResponseViewModel {
    const { responseViewModel } = params

    return {
      ...responseViewModel,
      name: responseViewModel.name.toUpperCase(),
      cpf: removeSpecialCharactersFromString(responseViewModel.cpf),
      role: getRole(responseViewModel.role.id)
    }
  }

  function getRole(id: number): any {
    const roles = [{
      id: 1,
      name: 'ADMIN',
      alias: 'ADMIN'
    }, {
      id: 2,
      name: 'ARCHITECT',
      alias: 'ARQUITETO(A)'
    }]

    return roles.find(role => role.id === id)
  }

  integrationTestRunner.run()
})
