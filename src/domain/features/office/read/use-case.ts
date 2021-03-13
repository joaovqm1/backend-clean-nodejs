import { OfficeEntity } from '../../office-user/office-entity'
import {
  AfterCreateCrudUseCase,
  AfterUpdateCrudUseCase,
  ReadCrudUseCase,
} from '../../crud'
import { ReadOfficeResponseDTO } from './response-dto'

export interface ReadOfficeUseCase
  extends AfterCreateCrudUseCase<ReadOfficeResponseDTO>,
  AfterUpdateCrudUseCase<ReadOfficeResponseDTO>,
  ReadCrudUseCase<ReadOfficeResponseDTO> {
  getOfficeForLoggedUser: (id: number) => Promise<OfficeEntity>
}
