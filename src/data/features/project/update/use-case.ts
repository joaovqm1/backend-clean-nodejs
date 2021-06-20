import {
  CreateProjectRequestDTO,
  ReadCrudUseCase,
  ReadProjectResponseDTO,
  UpdateCrudUseCase,
  UpdateFinancesForProjectUseCase,
  UpdateProjectRequestDTO,
  UpdateProjectScopesForProjectUseCase,
  UpdateProjectUseCase
} from '@/domain'

interface Params {
  updateCrudUseCase: UpdateCrudUseCase<CreateProjectRequestDTO, ReadProjectResponseDTO>
  readCrudUseCase: ReadCrudUseCase<ReadProjectResponseDTO>
  updateFinancesUseCase: UpdateFinancesForProjectUseCase
  updateProjectScopesUseCase: UpdateProjectScopesForProjectUseCase
}

export class UpdateProjectUseCaseImpl implements UpdateProjectUseCase {
  private readonly createCrudUseCase: UpdateCrudUseCase<CreateProjectRequestDTO, ReadProjectResponseDTO>
  private readonly readCrudUseCase: ReadCrudUseCase<ReadProjectResponseDTO>
  private readonly updateFinancesUseCase: UpdateFinancesForProjectUseCase
  private readonly updateProjectScopesUseCase: UpdateProjectScopesForProjectUseCase

  constructor(params: Params) {
    this.createCrudUseCase = params.updateCrudUseCase
    this.readCrudUseCase = params.readCrudUseCase
    this.updateFinancesUseCase = params.updateFinancesUseCase
    this.updateProjectScopesUseCase = params.updateProjectScopesUseCase
  }

  async update(request: UpdateProjectRequestDTO): Promise<ReadProjectResponseDTO> {
    const updatedProject: ReadProjectResponseDTO = await this.createCrudUseCase.update(request)

    if (request.payment) {
      updatedProject.finances = await this.updateFinancesUseCase.update({
        project: updatedProject,
        payment: request.payment
      })
    }

    if (request.scopes) {
      updatedProject.projectScopes = await this.updateProjectScopesUseCase.update({ project: updatedProject, scopes: request.scopes })
      updatedProject.projectScopes.sort((a, b) => a.scope.id - b.scope.id)

    }

    return updatedProject
  }
}
