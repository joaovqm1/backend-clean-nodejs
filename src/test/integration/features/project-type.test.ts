import faker from 'faker'
import { IntegrationTestRunner } from '@/test/utilities/integration-test-runner'
import { ProjectType } from '@/infra/database/models'
import { CreateProjectTypeRequestViewModel, CreateProjectTypeResponseViewModel } from '@/presentation'

describe('CRUD ProjectType', function() {
  const integrationTestRunner = new IntegrationTestRunner({
    feature: 'projecttypes',
    getObjectToCreate: getRandomCreateViewModel,
    getExpectedObject: getExpectedObject,
    uniqueErrorMessage: 'Já existe um tipo de projeto cadastrado com essa descrição',
    uniqueAttributes: {
      uniqueDescription: ['description'],
    },
    sequelizeModel: ProjectType,
    shouldCheckUpdaterId: false
  })

  function getRandomCreateViewModel(): { viewModel: CreateProjectTypeRequestViewModel } {
    return {
      viewModel: { description: faker.lorem.text(20) }
    }
  }

  function getExpectedObject(params: { responseViewModel: CreateProjectTypeResponseViewModel }): CreateProjectTypeResponseViewModel {
    const { responseViewModel } = params
    return {
      ...responseViewModel,
      description: responseViewModel.description.toUpperCase(),

    }
  }

  integrationTestRunner.run()
})
