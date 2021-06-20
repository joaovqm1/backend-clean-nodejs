import { CreateProjectScopesForProjectRequestDTO } from '../create'
import { ReadProjectScopeResponseDTO } from '../dto'

export interface UpdateProjectScopesForProjectRequestDTO extends CreateProjectScopesForProjectRequestDTO { }

export interface UpdateProjectScopesForProjectUseCase {
  update: (request: UpdateProjectScopesForProjectRequestDTO) => Promise<Array<Omit<ReadProjectScopeResponseDTO, 'project'>>>
}
