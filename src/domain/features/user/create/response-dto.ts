import { CreateCrudResponseDTO } from '@/domain/features/crud/create/response-dto'

import { UserEntity } from '../../office-user/user-entity'
export interface CreateUserResponseDTO
  extends UserEntity,
  CreateCrudResponseDTO { }
