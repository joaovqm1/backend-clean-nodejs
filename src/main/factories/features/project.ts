import {
  CreateProjectUseCaseImpl, ProjectModelMapper, UpdateProjectUseCaseImpl
} from '@/data'
import {
  CreateFinancesForProjectUseCase,
  CreateProjectPhasesForProjectUseCase,
  CreateProjectRequestDTO,
  CreateProjectScopesForProjectUseCase,
  projectFieldsToInclude,
  ReadProjectResponseDTO,
  UpdateFinancesForProjectUseCase,
  UpdateProjectRequestDTO,
  UpdateProjectScopesForProjectUseCase
} from '@/domain'
import { ProjectViewModelMapper } from '@/presentation'

import { RequestParamsWithUser } from '../request-params'
import { objectUtilities, stringUtilities } from '../utilities'
import { CrudFactory } from './crud'

interface Params {
  requestParams: RequestParamsWithUser
  createFinancesForProjectUseCase: CreateFinancesForProjectUseCase
  updateFinancesForProjectUseCase: UpdateFinancesForProjectUseCase
  createProjectScopesForProjectUseCase: CreateProjectScopesForProjectUseCase
  updateProjectScopesForProjectUseCase: UpdateProjectScopesForProjectUseCase
  createProjectPhasesForProjectUseCase: CreateProjectPhasesForProjectUseCase
}

export class ProjectFactory {
  private readonly projectCrudFactory: CrudFactory<CreateProjectRequestDTO, ReadProjectResponseDTO, ReadProjectResponseDTO, UpdateProjectRequestDTO>

  constructor(readonly params: Params) {
    this.projectCrudFactory = new CrudFactory<CreateProjectRequestDTO, ReadProjectResponseDTO, ReadProjectResponseDTO, UpdateProjectRequestDTO>({
      requestParams: params.requestParams,
      entityName: 'project',
      modelMapper: new ProjectModelMapper(objectUtilities),
      viewModelMapper: new ProjectViewModelMapper(stringUtilities),
      uniqueConstraintError: 'Já existe um projeto cadastrado com esse nome',
      fieldsToIncludeOnQuery: projectFieldsToInclude
    })

    const createUseCase = new CreateProjectUseCaseImpl({
      userId: params.requestParams.userId,
      createCrudUseCase: this.projectCrudFactory.getCreateUseCase(),
      createFinancesUseCase: params.createFinancesForProjectUseCase,
      createProjectPhasesUseCase: params.createProjectPhasesForProjectUseCase,
      createProjectScopesUseCase: params.createProjectScopesForProjectUseCase,
      deleteCrudUseCase: this.projectCrudFactory.getDeleteUseCase()
    })

    this.projectCrudFactory.setCreateCrudUseCase(createUseCase)

    const updateUseCase = new UpdateProjectUseCaseImpl({
      readCrudUseCase: this.projectCrudFactory.getReadUseCase(),
      updateCrudUseCase: this.projectCrudFactory.getUpdateUseCase(),
      updateFinancesUseCase: params.updateFinancesForProjectUseCase,
      updateProjectScopesUseCase: params.updateProjectScopesForProjectUseCase
    })

    this.projectCrudFactory.setUpdateCrudUseCase(updateUseCase)
  }

  getControllerFacade(): any {
    return {
      ...this.projectCrudFactory.getControllerFacade()
    }
  }
}
