import {
  CreateCrudUseCase,
  CreateFinancesForProjectUseCase,
  CreateProjectPhasesForProjectUseCase,
  CreateProjectRequestDTO,
  CreateProjectScopesForProjectUseCase,
  CreateProjectUseCase,
  DeleteCrudUseCase,
  ReadProjectResponseDTO
} from '@/domain'

interface Params {
  userId: number
  createCrudUseCase: CreateCrudUseCase<CreateProjectRequestDTO, ReadProjectResponseDTO>
  createFinancesUseCase: CreateFinancesForProjectUseCase
  createProjectScopesUseCase: CreateProjectScopesForProjectUseCase
  createProjectPhasesUseCase: CreateProjectPhasesForProjectUseCase
  deleteCrudUseCase: DeleteCrudUseCase
}

export class CreateProjectUseCaseImpl implements CreateProjectUseCase {
  private readonly userId: number
  private readonly createCrudUseCase: CreateCrudUseCase<CreateProjectRequestDTO, ReadProjectResponseDTO>
  private readonly createFinancesUseCase: CreateFinancesForProjectUseCase
  private readonly createProjectScopesUseCase: CreateProjectScopesForProjectUseCase
  private readonly createProjectPhasesUseCase: CreateProjectPhasesForProjectUseCase
  private readonly deleteCrudUseCase: DeleteCrudUseCase

  constructor(params: Params) {
    this.userId = params.userId
    this.createCrudUseCase = params.createCrudUseCase
    this.createFinancesUseCase = params.createFinancesUseCase
    this.createProjectScopesUseCase = params.createProjectScopesUseCase
    this.createProjectPhasesUseCase = params.createProjectPhasesUseCase
  }

  async create(request: CreateProjectRequestDTO): Promise<ReadProjectResponseDTO> {
    request.technicalManager = this.getTechnicalManagerId(request.technicalManager)

    const project: ReadProjectResponseDTO = await this.createCrudUseCase.create(request)

    try {
      if (request.payment) {
        project.finances = await this.createFinancesUseCase.create({ project, payment: request.payment })
      }

      if (request.scopes) {
        project.projectScopes = await this.createProjectScopesUseCase.create({ project, scopes: request.scopes })
        project.projectScopes.sort((a, b) => a.scope.id - b.scope.id)
      }

      project.projectPhases = await this.createProjectPhasesUseCase.create({ project })
      project.projectPhases.sort((a, b) => a.phase.id - b.phase.id)
    } catch (error) {
      await this.deleteCrudUseCase.delete(project.id)
      throw error
    }

    return project
  }

  getTechnicalManagerId(technicalManager?: { id: number }): { id: number } {
    return technicalManager || { id: this.userId }
  }
}