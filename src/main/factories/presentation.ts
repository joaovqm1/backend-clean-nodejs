import { EntityNotFoundError, RequestNoAuthenticatedError } from '@/domain'

import { accessController, FilterBuilder } from '@/data'
import { Filter } from '@/data/contracts'

import { DBFactory } from '@/main/factories/infra/db'

import { ReadApi } from '@/infra/repositories/contracts'
import User from '@/infra/database/models/user'

import { RequestParams } from './request-params'
import {
  OfficeFactory,
  UserFactory,
  StateFactory,
  CityFactory
} from './features'
export class ControllerFactory {
  // eslint-disable-next-line max-lines-per-function
  static async get(requestParams: RequestParams): Promise<any> {
    if (requestParams.token) {
      requestParams.userId = await validateUserAccessAndReturnItsId(requestParams)
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
      case 'STATES': {
        const controllerFactory = new StateFactory(requestParams)
        return controllerFactory.getControllerFacade()
      }
      case 'CITIES': {
        const controllerFactory = new CityFactory(requestParams)
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

async function validateUserAccessAndReturnItsId(params: RequestParams): Promise<number> {
  const user = await getUserByToken(params.token)
  if (!user && shouldThrownErrorIfUserNotFound(params)) {
    throw new RequestNoAuthenticatedError()
  } else {
    accessController.check({ ...params, user })
    return user.id
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

function shouldThrownErrorIfUserNotFound(params: RequestParams): boolean {
  switch (params.feature.toUpperCase()) {
    case 'STATES':
    case 'CITIES':
      return params.operation.toUpperCase() !== 'READ'
    default:
      return true
  }
}
