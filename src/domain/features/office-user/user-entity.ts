import { BaseEntity } from '@/domain/base-entity'

export interface UserEntity extends BaseEntity {
  id: number
  role: Role
  name: string
  email: string
  username: string
  birthdate?: string
  cpf: string
  token: string
}

interface Role {
  id: number
  name?: string
}

export interface UserPermission {
  [feature: string]: {
    create?: boolean
    read?: boolean
    update?: boolean
    delete?: boolean
  }
}

export const userFieldsToInclude = ['role.id', 'role.name', 'role.alias']
