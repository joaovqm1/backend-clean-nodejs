import { BaseEntity } from '@/domain/base-entity'

export interface CustomerSupplierEntity extends BaseEntity {
  id: number
  name: string
  tradingName?: string
  email?: string
  profile: CustomerSupplierProfile
  type: CustomerSupplierType
  class: CustomerSupplierClass
  cellphone1?: string
  cellphone2?: string
  phone1?: string
  phone2?: string
  website?: string
  birthdate?: string
  cpfCnpj?: string
  identityCard?: string
  address1?: string
  address2?: string
  postcode?: string
  addressReference?: string
  state?: State
  city?: City
  neighborhood?: string
  addressNumber?: string
  addressComplement?: string
  additionalInfo?: string
  bank?: Bank
  bankBranch?: string
  bankAccount?: string
  bankAccountType?: BankAccountType
}

export enum CustomerSupplierProfile {
  CUSTUMERSUPPLIER = 'CLIENTE/FORNECEDOR',
  LEAD = 'CONTATO',
}

export enum BankAccountType {
  CURRENT = 'CORRENTE',
  SAVINGS = 'POUPANÇA',
}

export enum CustomerSupplierType {
  PHYSICAL = 'FÍSICO',
  LEGAL = 'JURÍDICO',
}

export enum CustomerSupplierClass {
  CUSTOMER = 'CLIENTE',
  SUPPLIER = 'FORNECEDOR',
  BOTH = 'AMBOS',
}

interface State {
  id: number
  name?: string
}

interface City {
  id: number
  name?: string
}
interface Bank {
  id: number
  name?: string

}

export const customerSupplierFieldsToInclude = ['state.id', 'state.name', 'city.id', 'city.name', 'bank.id', 'bank.name']
