import { ReadCrudResponseDTO } from '@/domain/features/crud'
import { OfficeEntity } from '../../office-user/office-entity'

export interface ReadOfficeResponseDTO
  extends ReadCrudResponseDTO,
  OfficeEntity {}
