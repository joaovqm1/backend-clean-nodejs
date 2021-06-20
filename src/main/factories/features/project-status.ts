import {
  ProjectStatusModelMapper,
} from '@/data'
import {
  CreateProjectStatusRequestDTO,
  ReadProjectStatusResponseDTO,
  UpdateProjectStatusRequestDTO,
} from '@/domain'
import { ProjectStatusViewModelMapper } from '@/presentation'

import { RequestParamsWithUser } from '../request-params'
import { CrudFactory } from './crud'

export class ProjectStatusFactory {
  private readonly financeMethodCrudFactory: CrudFactory<CreateProjectStatusRequestDTO, ReadProjectStatusResponseDTO, ReadProjectStatusResponseDTO, UpdateProjectStatusRequestDTO>

  constructor(readonly requestParams: RequestParamsWithUser) {
    this.financeMethodCrudFactory = new CrudFactory<CreateProjectStatusRequestDTO, ReadProjectStatusResponseDTO, ReadProjectStatusResponseDTO, UpdateProjectStatusRequestDTO>({
      requestParams,
      entityName: 'projectstatus',
      modelMapper: new ProjectStatusModelMapper(),
      viewModelMapper: new ProjectStatusViewModelMapper(),
      uniqueConstraintError: 'Já existe um status de projeto cadastrado com essa descrição',
      isHybridTable: true
    })
  }

  getControllerFacade(): any {
    return this.financeMethodCrudFactory.getControllerFacade()
  }
}
