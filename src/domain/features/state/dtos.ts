import { ReadCrudResponseDTO } from '@/domain/features/crud'
import { StateEntity } from './entity'

export interface ReadStateResponseDTO extends ReadCrudResponseDTO, StateEntity { }
