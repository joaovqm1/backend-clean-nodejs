import { UserEntity } from '@/domain/features'

export interface UserModel extends Omit<UserEntity, 'id' | 'role'> {
  id: number
  role?: {
    id: number
    name?: string
  }
  officeId?: number
  roleId?: number
  passwordHash?: string
}
