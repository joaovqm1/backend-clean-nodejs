// eslint-disable-next-line @typescript-eslint/no-empty-interface
import { CreateCrudRequestDTO } from '@/domain/features/crud/create/request-dto'

import { OfficeEntity } from '../../office-user/office-entity'

export interface CreateOfficeRequestDTO
  extends Omit<OfficeEntity, 'id'>,
  CreateCrudRequestDTO {
  user: {
    username: string
    password: string
  }
}
