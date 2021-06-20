import faker from 'faker'
import { IntegrationTestRunner } from '@/test/utilities/integration-test-runner'
import { CreateOfficeResponseViewModel, CreateProjectRequestViewModel, CreateProjectResponseViewModel, FinanceStatusViewModel, ReadFinanceResponseViewModel } from '@/presentation'
import { createCustomerSupplier, createUser } from '@/test/utilities/set-up'
import { City, Project, ProjectStatus, ProjectType, Scope, State } from '@/infra/database/models'
import { getObjectByIdFromSequelizeModel, getObjectsByIdsFromSequelizeModel } from '@/test/utilities/query'
import { ProjectPhaseEntity, ProjectScopeEntity } from '@/domain'
import { formatedZipCode, removeSpecialCharactersFromString } from '@/test/utilities/fakes'
import { dateUtilities } from '@/main'
import { ScopeModel } from '@/data'

describe('CRUD Project', function() {
  const integrationTestRunner = new IntegrationTestRunner({
    feature: 'projects',
    getObjectToCreate: getRandomCreateViewModel,
    getExpectedObject: getExpectedObject,
    uniqueAttributes: {
      uniqueName: ['name']
    },
    uniqueErrorMessage: 'Já existe um projeto cadastrado com esse nome',
    sequelizeModel: Project,
    optionalFields: [
      'payment',
      'finishDate',
      'dueDate',
      'totalArea',
      'postcode',
      'address',
      'state',
      'city',
      'neighborhood',
      'addressComplement',
      'addressReference',
      'addressNumber',
      'annotation',
      'scopes'
    ],
    shouldCheckUpdaterId: false
  })

  async function getRandomCreateViewModel(params: { office: CreateOfficeResponseViewModel }): Promise<{ metadata: any, viewModel: CreateProjectRequestViewModel }> {
    const { office } = params

    const customer = await createCustomerSupplier(office)
    const projectType = await getObjectByIdFromSequelizeModel(faker.datatype.number({ min: 1, max: 4 }), ProjectType)
    const projectStatus = await getObjectByIdFromSequelizeModel(faker.datatype.number({ min: 1, max: 4 }), ProjectStatus)
    const city = await getObjectByIdFromSequelizeModel(faker.datatype.number({ min: 1, max: 3 }), City)
    const state = await getObjectByIdFromSequelizeModel(faker.datatype.number({ min: 1, max: 2 }), State)
    const technicalManager = await createUser(office)

    const scopesIds: number[] = Array.from({ length: faker.datatype.number({ min: 1, max: 4 }) }, () => faker.datatype.number({ min: 1, max: 9 }))
    const scopes: any[] = await getObjectsByIdsFromSequelizeModel(scopesIds, Scope)

    const request: CreateProjectRequestViewModel = {
      customer: {
        id: customer.id
      },
      projectType: {
        id: projectType.id
      },
      projectStatus: {
        id: projectStatus.id
      },
      name: faker.name.findName(),
      scopes: scopes.map((scope) => { return { id: scope.id } }),
      startDate: faker.date.past().toISOString().split('T')[0],
      dueDate: faker.date.future().toISOString().split('T')[0],
      finishDate: faker.date.future().toISOString().split('T')[0],
      city: {
        id: city.id
      },
      state,
      payment: {
        entry: faker.datatype.number(),
        interval: faker.datatype.number(),
        value: faker.datatype.number(),
        finances: [{
          date: faker.date.future().toISOString().split('T')[0],
          status: faker.datatype.boolean() ? FinanceStatusViewModel.NOTRECEIVED : FinanceStatusViewModel.RECEIVED,
          value: faker.datatype.number()
        }]
      },
      address: faker.address.streetName(),
      postcode: formatedZipCode(),
      addressReference: faker.random.word(),
      neighborhood: faker.random.word(),
      addressNumber: faker.datatype.number().toString(),
      addressComplement: faker.random.word(),
      annotation: faker.random.word(),
      totalArea: faker.datatype.number(),
      technicalManager: { id: technicalManager.id }
    }

    return {
      metadata: {
        customer,
        projectType,
        city,
        state,
        technicalManager,
        projectStatus,
        scopes
      },
      viewModel: request
    }
  }

  function getExpectedObject(params: {
    metadata: any,
    requestViewModel: CreateProjectRequestViewModel,
    responseViewModel: CreateProjectResponseViewModel
  }): CreateProjectResponseViewModel {
    const { metadata, requestViewModel, responseViewModel } = params

    const { customer, projectType, city, state, technicalManager, projectStatus, scopes } = metadata

    const changedResponseViewModel: CreateProjectResponseViewModel = {
      ...responseViewModel,
      name: responseViewModel.name.toUpperCase(),
      customer: getObjectWithIdAndName(customer),
      projectType: getObjectWithIdAndDescription(projectType),
      projectStatus: getObjectWithIdAndDescription(projectStatus),
      address: responseViewModel.address?.toUpperCase(),
      addressReference: responseViewModel.addressReference?.toUpperCase(),
      addressComplement: responseViewModel.addressComplement?.toUpperCase(),
      addressNumber: responseViewModel.addressNumber?.toUpperCase(),
      neighborhood: responseViewModel.neighborhood?.toUpperCase(),
      annotation: responseViewModel.annotation?.toUpperCase(),
      postcode: removeSpecialCharactersFromString(responseViewModel.postcode)
    }

    if (responseViewModel.city) {
      changedResponseViewModel.city = getObjectWithIdAndName(city)
    }

    if (responseViewModel.state) {
      changedResponseViewModel.state = getObjectWithIdAndName(state)
    }

    if (responseViewModel.technicalManager) {
      changedResponseViewModel.technicalManager = getObjectWithIdAndName(technicalManager)
    }

    changedResponseViewModel.projectPhases = getProjectPhases(responseViewModel)

    if (changedResponseViewModel.projectScopes?.length > 0) {
      changedResponseViewModel.projectScopes = getProjectScopes(scopes, responseViewModel)
    }

    if (changedResponseViewModel.payment) {
      changedResponseViewModel.finances = getFinances(requestViewModel, responseViewModel)
    }

    return changedResponseViewModel
  }

  function getObjectWithIdAndName(object: any): { id: number, name: string } {
    return { id: object.id, name: object.name }
  }

  function getObjectWithIdAndDescription(object: any): { id: number, description: string } {
    return { id: object.id, description: object.description }
  }

  function getProjectPhases(responseViewModel: CreateProjectResponseViewModel): Array<Omit<ProjectPhaseEntity, 'project'>> {
    return [
      {
        ...responseViewModel.projectPhases[0],
        startDate: dateUtilities.format(new Date()),
        phase: {
          id: 1,
          description: 'LEVANTAMENTO'
        }
      },
      {
        ...responseViewModel.projectPhases[1],
        startDate: dateUtilities.format(new Date()),
        phase: {
          id: 2,
          description: 'ANTEPROJETO'
        }
      },
      {
        ...responseViewModel.projectPhases[2],
        startDate: dateUtilities.format(new Date()),
        phase: {
          id: 3,
          description: 'EXECUTIVO'
        }
      },
      {
        ...responseViewModel.projectPhases[3],
        startDate: dateUtilities.format(new Date()),
        phase: {
          id: 4,
          description: 'DETALHAMENTO'
        }
      }
    ]
  }

  function getProjectScopes(scopes: ScopeModel[], responseViewModel: CreateProjectResponseViewModel): Array<Omit<ProjectScopeEntity, 'project'>> {
    scopes.sort((a, b) => a.id - b.id)
    return scopes.map(function(scope, index) {
      return {
        ...responseViewModel.projectScopes[index],
        scope: {
          id: scope.id,
          description: scope.description
        }
      }
    })
  }

  function getFinances(
    requestViewModel: CreateProjectRequestViewModel,
    responseViewModel: CreateProjectResponseViewModel
  ): any[] {
    if (responseViewModel.payment === undefined) {
      return []
    } else {
      const finances: Array<Omit<ReadFinanceResponseViewModel, 'customerSupplier' | 'financeType' | 'type'>> = []

      finances.push({
        ...responseViewModel.finances[0],
        description: `ENTRADA DE VALOR DO PROJETO - OBRA: ${responseViewModel.name}`,
        status: FinanceStatusViewModel.RECEIVED,
        finishDate: dateUtilities.format(new Date()),
        value: responseViewModel.payment.entry
      })

      for (const finance of requestViewModel.payment.finances) {
        finances.push({
          ...responseViewModel.finances.find((filter) => filter.value === finance.value
            && filter.status === finance.status),
          dateToFinish: finance.status === FinanceStatusViewModel.NOTRECEIVED ? finance.date : null,
          finishDate: finance.status === FinanceStatusViewModel.NOTRECEIVED ? null : finance.date,
          value: finance.value,
          description: `PARCELA DE VALOR DO PROJETO - OBRA: ${responseViewModel.name}`
        })
      }

      return finances
    }


  }

  integrationTestRunner.run()
})
