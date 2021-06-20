import { ReadProjectScopeResponseDTO } from '../dto'

export interface CreateProjectScopesForProjectRequestDTO {
  project: {
    id: number
  }
  scopes: Array<{
    id: number
  }>
}
export interface CreateProjectScopesForProjectUseCase {
  create: (request: CreateProjectScopesForProjectRequestDTO) => Promise<Array<Omit<ReadProjectScopeResponseDTO, 'project'>>>
}
