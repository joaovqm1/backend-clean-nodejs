import { ReadCrudResponseDTO } from '@/domain/features/crud'
import { CityEntity } from './entity'

export interface ReadCityResponseDTO extends ReadCrudResponseDTO, CityEntity { }
