// eslint-disable-next-line @typescript-eslint/no-empty-interface
import { UserEntity } from '../../office-user/user-entity'

export interface CreateUserRequestDTO
  extends Omit<UserEntity, 'id' | 'token'> {
  token?: string
  password: string
}
