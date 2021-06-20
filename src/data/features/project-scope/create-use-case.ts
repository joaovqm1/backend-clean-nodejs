import { FilterBuilder } from '@/data/filter-builder'
import {
  CreateCrudUseCase,
  CreateProjectScopeRequestDTO,
  CreateProjectScopesForProjectRequestDTO,
  CreateProjectScopesForProjectUseCase,
  ReadCrudUseCase,
  ReadProjectScopeResponseDTO,
  ReadScopeResponseDTO
} from '@/domain'

interface Params {
  readScopesUseCase: ReadCrudUseCase<ReadScopeResponseDTO>
  createProjectScopeUseCase: CreateCrudUseCase<CreateProjectScopeRequestDTO, ReadProjectScopeResponseDTO>
}

export class CreateProjectScopesForProjectImpl implements CreateProjectScopesForProjectUseCase {
  private readonly readScopesUseCase: ReadCrudUseCase<ReadScopeResponseDTO>
  private readonly createProjectScopeUseCase: CreateCrudUseCase<CreateProjectScopeRequestDTO, ReadProjectScopeResponseDTO>

  constructor(params: Params) {
    this.createProjectScopeUseCase = params.createProjectScopeUseCase
    this.readScopesUseCase = params.readScopesUseCase
  }

  async create(request: CreateProjectScopesForProjectRequestDTO): Promise<ReadProjectScopeResponseDTO[]> {
    const scopes = await this.getScopesByIds(request.scopes.map((scope) => scope.id))

    const projectScopes: ReadProjectScopeResponseDTO[] = []

    for (const scope of scopes) {
      const createProjectScopeRequest: CreateProjectScopeRequestDTO = {
        project: request.project,
        scope: scope
      }

      projectScopes.push(await this.createProjectScopeUseCase.create(createProjectScopeRequest))
    }

    return projectScopes
  }

  async getScopesByIds(ids: number[]): Promise<ReadScopeResponseDTO[]> {
    const filters = new FilterBuilder()
      .containedIn('id', ids)
      .select(['id'])
      .build()

    return (await this.readScopesUseCase.getMany(filters)).items
  }
}