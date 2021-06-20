import {
  ProjectTypeModelMapper,
} from '@/data'
import {
  CreateProjectTypeRequestDTO,
  ReadProjectTypeResponseDTO,
  UpdateProjectTypeRequestDTO,
} from '@/domain'
import { ProjectTypeViewModelMapper } from '@/presentation'

import { RequestParamsWithUser } from '../request-params'
import { CrudFactory } from './crud'

export class ProjectTypeFactory {
  private readonly financeMethodCrudFactory: CrudFactory<CreateProjectTypeRequestDTO, ReadProjectTypeResponseDTO, ReadProjectTypeResponseDTO, UpdateProjectTypeRequestDTO>
  constructor(readonly requestParams: RequestParamsWithUser) {
    this.financeMethodCrudFactory = new CrudFactory<CreateProjectTypeRequestDTO, ReadProjectTypeResponseDTO, ReadProjectTypeResponseDTO, UpdateProjectTypeRequestDTO>({
      requestParams,
      entityName: 'projecttype',
      modelMapper: new ProjectTypeModelMapper(),
      viewModelMapper: new ProjectTypeViewModelMapper(),
      uniqueConstraintError:
        'Já existe um tipo de projeto cadastrado com essa descrição',
      isHybridTable: true
    })
  }

  getControllerFacade(): any {
    return this.financeMethodCrudFactory.getControllerFacade()
  }
}
