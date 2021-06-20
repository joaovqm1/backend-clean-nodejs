import { UserEntity } from '../../office-user/user-entity'

export interface UpdateUserRequestDTO extends Omit<UserEntity, 'token'> {
  passwordHash?: string
}
