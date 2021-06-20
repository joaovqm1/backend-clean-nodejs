import {
  CreateProjectPhasesForProjectImpl,
  ProjectPhaseModelMapper
} from '@/data'
import {
  CreateProjectPhaseRequestDTO,
  CreateProjectPhasesForProjectUseCase,
  projectPhasesFieldsToInclude,
  ReadCrudUseCase,
  ReadPhaseResponseDTO,
  ReadProjectPhaseResponseDTO,
  UpdateProjectPhaseRequestDTO,
} from '@/domain'
import { ProjectPhaseViewModelMapper } from '@/presentation'

import { RequestParamsWithUser } from '../request-params'
import { dateUtilities } from '../utilities'
import { CrudFactory } from './crud'

interface Params {
  requestParams: RequestParamsWithUser
  readPhasesUseCase: ReadCrudUseCase<ReadPhaseResponseDTO>
}

export class ProjectPhaseFactory {
  private readonly crudFactory: CrudFactory<CreateProjectPhaseRequestDTO, ReadProjectPhaseResponseDTO, ReadProjectPhaseResponseDTO, UpdateProjectPhaseRequestDTO>
  private readonly readPhasesUseCase: ReadCrudUseCase<ReadPhaseResponseDTO>

  constructor(readonly params: Params) {
    this.crudFactory = new CrudFactory<CreateProjectPhaseRequestDTO, ReadProjectPhaseResponseDTO, ReadProjectPhaseResponseDTO, UpdateProjectPhaseRequestDTO>({
      requestParams: params.requestParams,
      entityName: 'projectphase',
      modelMapper: new ProjectPhaseModelMapper(),
      viewModelMapper: new ProjectPhaseViewModelMapper(),
      uniqueConstraintError: 'Essa fase já está cadastrada para esse projeto',
      fieldsToIncludeOnQuery: projectPhasesFieldsToInclude
    })
    this.readPhasesUseCase = params.readPhasesUseCase
  }

  getControllerFacade(): any {
    return this.crudFactory.getControllerFacade()
  }

  getCreateProjectPhasesForProject(): CreateProjectPhasesForProjectUseCase {
    return new CreateProjectPhasesForProjectImpl({
      createProjectPhaseUseCase: this.crudFactory.getCreateUseCase(),
      readPhasesUseCase: this.readPhasesUseCase,
      dateUtilities
    })
  }
}
