import { CreateCrudResponseDTO } from '@/domain/features/crud/create/response-dto'
import { OfficeEntity,UserEntity } from '@/domain/features/office-user'

export interface CreateOfficeResponseDTO
  extends OfficeEntity,
  CreateCrudResponseDTO {
  user: UserEntity
}
