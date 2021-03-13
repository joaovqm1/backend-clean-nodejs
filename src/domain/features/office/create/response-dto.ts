import { CreateCrudResponseDTO } from '@/domain/features/crud/create/response-dto'
import { UserEntity, OfficeEntity } from '@/domain/features/office-user'

export interface CreateOfficeResponseDTO
  extends OfficeEntity,
  CreateCrudResponseDTO {
  user: UserEntity
}
