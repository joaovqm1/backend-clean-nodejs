import {
  CreateProjectScopesForProjectImpl,
  ProjectScopeModelMapper,
  UpdateProjectScopesForProjectImpl
} from '@/data'
import {
  CreateProjectScopeRequestDTO,
  CreateProjectScopesForProjectUseCase,
  projectScopesFieldsToInclude,
  ReadCrudUseCase,
  ReadProjectScopeResponseDTO,
  ReadScopeResponseDTO,
  UpdateProjectScopeRequestDTO,
  UpdateProjectScopesForProjectUseCase,
} from '@/domain'

import { RequestParamsWithUser } from '../request-params'
import { CrudFactory } from './crud'

interface Params {
  requestParams: RequestParamsWithUser
  readScopesUseCase: ReadCrudUseCase<ReadScopeResponseDTO>
}

export class ProjectScopeFactory {
  private readonly crudFactory: CrudFactory<CreateProjectScopeRequestDTO, ReadProjectScopeResponseDTO, ReadProjectScopeResponseDTO, UpdateProjectScopeRequestDTO>
  private readonly readScopesUseCase: ReadCrudUseCase<ReadScopeResponseDTO>

  constructor(readonly params: Params) {
    this.crudFactory = new CrudFactory<CreateProjectScopeRequestDTO, ReadProjectScopeResponseDTO, ReadProjectScopeResponseDTO, UpdateProjectScopeRequestDTO>({
      requestParams: params.requestParams,
      entityName: 'projectscope',
      modelMapper: new ProjectScopeModelMapper(),
      viewModelMapper: undefined,
      uniqueConstraintError: 'Esse escopo já está cadastrado para esse projeto',
      fieldsToIncludeOnQuery: projectScopesFieldsToInclude
    })
    this.readScopesUseCase = params.readScopesUseCase
  }

  getControllerFacade(): any {
    return this.crudFactory.getControllerFacade()
  }

  getCreateProjectScopesForProject(): CreateProjectScopesForProjectUseCase {
    return new CreateProjectScopesForProjectImpl({
      createProjectScopeUseCase: this.crudFactory.getCreateUseCase(),
      readScopesUseCase: this.readScopesUseCase
    })
  }

  getUpdateProjectScopesForProject(): UpdateProjectScopesForProjectUseCase {
    return new UpdateProjectScopesForProjectImpl({
      createProjectScopeForProjectUseCase: this.getCreateProjectScopesForProject(),
      deleteUseCase: this.crudFactory.getDeleteUseCase(),
      readProjectScopeUseCase: this.crudFactory.getReadUseCase()
    })
  }
}
