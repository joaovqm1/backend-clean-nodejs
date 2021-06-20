// eslint-disable-next-line simple-import-sort/imports
import { UpdateProjectRequestDTO, ReadProjectResponseDTO } from '../dto'
export interface UpdateProjectUseCase {
  update: (request: UpdateProjectRequestDTO) => Promise<ReadProjectResponseDTO>
}
