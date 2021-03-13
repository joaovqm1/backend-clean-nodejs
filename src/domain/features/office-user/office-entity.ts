import { BaseEntity } from '@/domain/base-entity'

export interface OfficeEntity extends BaseEntity {
  id: number
  name: string
  tradingName?: string
  email: string
  owner?: string
  cnpj?: string
  cpf?: string
  cellphone: string
  postcode?: string
  address?: string
  addressReference?: string
  addressComplement?: string
  neighborhood?: string
  addressNumber?: string
  plan?: Plan
  state: State
  city: City
}

interface Plan {
  id: number
  name?: string
}

interface State {
  id: number
  name?: string
}

interface City {
  id: number
  name?: string
}

export const officeFieldsToInclude = [
  'state.id',
  'state.name',
  'city.id',
  'city.name',
  'plan.id',
  'plan.name',
]
