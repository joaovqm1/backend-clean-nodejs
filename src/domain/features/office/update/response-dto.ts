import { OfficeEntity } from '../../office-user/office-entity'
import { UpdateCrudResponse } from '@/domain/features/crud'

export interface UpdateOfficeResponseDTO
  extends OfficeEntity,
  UpdateCrudResponse {}
