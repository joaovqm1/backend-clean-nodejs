import { ReadProjectPhaseResponseDTO } from '../dto'

export interface CreateProjectPhasesForProjectRequestDTO {
  project: {
    id: number
  }
}
export interface CreateProjectPhasesForProjectUseCase {
  create: (request: CreateProjectPhasesForProjectRequestDTO) => Promise<Array<Omit<ReadProjectPhaseResponseDTO, 'project'>>>
}
