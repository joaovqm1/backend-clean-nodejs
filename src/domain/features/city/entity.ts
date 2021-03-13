import { StateEntity } from '../state'

export interface CityEntity {
  id: number
  name: string
  ibge: number
  state: Omit<StateEntity, 'initials'>
}

export const cityFieldsToInclude = [
  'state.id',
  'state.name'
]