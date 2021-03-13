import { UpdateCrudRequestDTO } from '@/domain/features/crud'
import {
  OfficeEntity,
} from '../../office-user/office-entity'

export interface UpdateOfficeRequestDTO
  extends OfficeEntity,
  UpdateCrudRequestDTO {
}
