import { UserEntity, OfficeEntity } from '@/domain/features/office-user'
export interface LogInRequestDTO {
  usernameOrEmail: string
  password: string
}

export interface LogInResponseDTO extends UserEntity {
  office: OfficeEntity
  token: string
}

export interface LogInUseCase {
  logIn: (request: LogInRequestDTO) => Promise<LogInResponseDTO>
}
