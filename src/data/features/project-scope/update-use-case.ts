import { FilterBuilder } from '@/data/filter-builder'
import {
  CreateProjectScopesForProjectUseCase,
  DeleteCrudUseCase,
  ReadCrudUseCase,
  ReadProjectScopeResponseDTO,
  UpdateProjectScopesForProjectRequestDTO,
  UpdateProjectScopesForProjectUseCase
} from '@/domain'

interface Params {
  readProjectScopeUseCase: ReadCrudUseCase<ReadProjectScopeResponseDTO>
  createProjectScopeForProjectUseCase: CreateProjectScopesForProjectUseCase
  deleteUseCase: DeleteCrudUseCase
}

export class UpdateProjectScopesForProjectImpl implements UpdateProjectScopesForProjectUseCase {
  private readonly readProjectScopeUseCase: ReadCrudUseCase<ReadProjectScopeResponseDTO>
  private readonly createProjectScopeForProjectUseCase: CreateProjectScopesForProjectUseCase
  private readonly deleteUseCase: DeleteCrudUseCase

  constructor(params: Params) {
    this.readProjectScopeUseCase = params.readProjectScopeUseCase
    this.createProjectScopeForProjectUseCase = params.createProjectScopeForProjectUseCase
    this.deleteUseCase = params.deleteUseCase
  }

  async update(request: UpdateProjectScopesForProjectRequestDTO): Promise<Array<Omit<ReadProjectScopeResponseDTO, 'project'>>> {
    const currentProjectScopes = await this.getCurrentProjectsScopes(request.project.id)
    const scopesToAdd = this.getScopesToAdd(request, currentProjectScopes)

    const newProjectsScopes = await this.createProjectScopeForProjectUseCase.create({ ...request, scopes: scopesToAdd })

    const projectsScopesToDelete = this.getProjectsScopesToDelete(request, currentProjectScopes)
    // eslint-disable-next-line @typescript-eslint/space-before-function-paren
    projectsScopesToDelete.forEach(async (projectScope) => { await this.deleteUseCase.delete(projectScope.id) })

    const projectsScopesWhichWereNotDelete = this.getCurrentProjectsScopesWhichWereDeleted(currentProjectScopes, projectsScopesToDelete)
    return projectsScopesWhichWereNotDelete.concat(newProjectsScopes)
  }

  async getCurrentProjectsScopes(projectId: number): Promise<ReadProjectScopeResponseDTO[]> {
    const filters = new FilterBuilder()
      .equalTo('projectId', projectId)
      .select(['id'])
      .include(['scope.id', 'scope.description'])
      .build()

    return (await this.readProjectScopeUseCase.getMany(filters)).items
  }

  getScopesToAdd(request: UpdateProjectScopesForProjectRequestDTO, currentProjectScopes: ReadProjectScopeResponseDTO[]): Array<{ id: number }> {
    const scopesToAdd: Array<{ id: number }> = []
    for (const scope of request.scopes) {
      const projectScope = currentProjectScopes.find(filter => filter.scope.id === scope.id)
      if (projectScope === undefined) {
        scopesToAdd.push(scope)
      }
    }

    return scopesToAdd
  }

  getProjectsScopesToDelete(request: UpdateProjectScopesForProjectRequestDTO, currentProjectScopes: ReadProjectScopeResponseDTO[]): ReadProjectScopeResponseDTO[] {
    const projectsScopesToDelete: ReadProjectScopeResponseDTO[] = []
    for (const projectScope of currentProjectScopes) {
      const scope = request.scopes.find(filter => filter.id === projectScope.scope.id)
      if (scope === undefined) {
        projectsScopesToDelete.push(projectScope)
      }
    }

    return projectsScopesToDelete
  }

  getCurrentProjectsScopesWhichWereDeleted(currentProjects: ReadProjectScopeResponseDTO[], deletedProjectScopes: Array<{ id: number }>): Array<Omit<ReadProjectScopeResponseDTO, 'project'>> {
    const newProjectsScopes: ReadProjectScopeResponseDTO[] = []

    for (const projectScope of currentProjects) {
      const deletedProjectScope = deletedProjectScopes.find(filter => filter.id === projectScope.id)
      if (deletedProjectScope === undefined) {
        newProjectsScopes.push(projectScope)
      }
    }

    return newProjectsScopes
  }
}
