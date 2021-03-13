import { CreateUserForOfficeRequestDTO } from './request-dto'
import { CreateUserForOfficeResponseDTO } from './response-dto'

export interface CreateUserForOfficeUseCase {
  create: (
    object: CreateUserForOfficeRequestDTO
  ) => Promise<CreateUserForOfficeResponseDTO>
}
