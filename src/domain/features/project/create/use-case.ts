import { CreateProjectRequestDTO, ReadProjectResponseDTO } from '../dto'

export interface CreateProjectUseCase {
  create: (request: CreateProjectRequestDTO) => Promise<ReadProjectResponseDTO>
}
