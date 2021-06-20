import { UpdateCrudResponse } from '@/domain/features/crud'

import { OfficeEntity } from '../../office-user/office-entity'

export interface UpdateOfficeResponseDTO
  extends OfficeEntity,
  UpdateCrudResponse {}
