import { accessController, FilterBuilder } from '@/data'
import { EntityNotFoundError, Filter, RequestNoAuthenticatedError } from '@/domain'
import User from '@/infra/database/models/user'
import { ReadApi } from '@/infra/repositories/contracts'
import { DBFactory } from '@/main/factories/infra/db'

import {
  BankFactory,
  CityFactory,
  CustomerSupplierFactory,
  DocumentFactory,
  FinanceFactory,
  FinanceMethodFactory,
  FinanceTypeFactory,
  OfficeFactory,
  StateFactory,
  TaskFactory,
  UserFactory
} from './features'
import { RequestParams } from './request-params'
export class ControllerFactory {
  // eslint-disable-next-line max-lines-per-function
  static async get(requestParams: RequestParams): Promise<any> {
    if (requestParams.token) {
      const user = await getUserByToken(requestParams.token)
      requestParams.userId = user.id
      validateAccess({ ...requestParams, user })
    } else {
      validateAccess(requestParams)
    }

    switch (requestParams.feature.toUpperCase()) {
      case 'OFFICES': {
        const officeFactory = ControllerFactory.getOffice(requestParams)
        const controllerFactory = ControllerFactory.getUser(
          requestParams,
          officeFactory
        )
        return officeFactory.getControllerFacade(controllerFactory)
      }
      case 'USERS': {
        const controllerFactory = ControllerFactory.getUser(requestParams)
        return controllerFactory.getControllerFacade()
      }
      case 'DOCUMENTS': {
        const controllerFactory = new DocumentFactory(requestParams)
        return controllerFactory.getControllerFacade()
      }
      case 'CUSTOMERS':
      case 'SUPPLIERS':
      case 'CUSTOMERSSUPPLIERS': {
        const customerSupplierFactory = new CustomerSupplierFactory(requestParams)
        return customerSupplierFactory.getControllerFacade()
      }
      case 'STATES': {
        const controllerFactory = new StateFactory(requestParams)
        return controllerFactory.getControllerFacade()
      }
      case 'CITIES': {
        const controllerFactory = new CityFactory(requestParams)
        return controllerFactory.getControllerFacade()
      }
      case 'FINANCEMETHODS': {
        const controllerFactory = new FinanceMethodFactory(requestParams)
        return controllerFactory.getControllerFacade()
      }
      case 'FINANCETYPES': {
        const controllerFactory = new FinanceTypeFactory(requestParams)
        return controllerFactory.getControllerFacade()
      }
      case 'TASKS': {
        const controllerFactory = new TaskFactory(requestParams)
        return controllerFactory.getControllerFacade()
      }
      case 'BANKS': {
        const controllerFactory = new BankFactory(requestParams)
        return controllerFactory.getControllerFacade()
      }
      case 'INCOMES':
      case 'EXPENSES': {
        const controllerFactory = new FinanceFactory(requestParams)
        return controllerFactory.getControllerFacade()
      }
      default:
        throw new EntityNotFoundError(`Não foi possível encontrar a entidade ${requestParams.feature}`)
    }
  }

  static getOffice(params: RequestParams): OfficeFactory {
    return new OfficeFactory(params)
  }

  static getUser(
    params: RequestParams,
    officeFactory: OfficeFactory = ControllerFactory.getOffice(params)
  ): UserFactory {
    return new UserFactory(params, officeFactory)
  }
}

async function getUserByToken(token: string): Promise<any> {
  const readApi: ReadApi = DBFactory.getReadApi({ modelName: 'user', sequelizeModel: User })

  const filters: Filter[] = new FilterBuilder()
    .equalTo('token', token)
    .include(['role.id', 'role.name'])
    .build()

  return readApi.get(filters)
}

function validateAccess(params: RequestParams & { user?: any }): void {
  if (!accessController.isOperationAllowed(params)) {
    throw new RequestNoAuthenticatedError()
  }
}


