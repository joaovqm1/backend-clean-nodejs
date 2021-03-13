import { Roles } from '@/data/features/user/roles'
import {
  OfficeEntity,
  UserEntity,
  CityEntity,
  StateEntity
} from '@/domain'

/**
 * Objects
 */
export const officeEntity: OfficeEntity = {
  id: 1,
  email: 'officeemail@email.com',
  name: 'OFFICE NAME',
  tradingName: 'MY OFFICE',
  owner: 'OFFICE OWNER',
  cnpj: '26359698000120',
  cpf: '57824787052',
  cellphone: '319899999999',
  plan: {
    id: 1,
    name: 'TRIAL'
  },
  state: {
    id: 1,
    name: 'MINAS GERAIS'
  },
  city: {
    id: 1,
    name: 'SÃO SEBASTIÃO DO RIO PRETO'
  },
  postcode: '35815000',
  address: 'RUA TESTE',
  neighborhood: 'CENTRO',
  addressNumber: '22'
}

export const userEntity: UserEntity = {
  id: 1,
  role: {
    id: 1,
    name: Roles.OWNER
  },
  cpf: '11111111111',
  email: 'useremail@email.com',
  username: 'username',
  name: 'RUAN CARLOS',
  token: 'acessToken'
}

export function getStateById(id: number): any {
  return [{
    id: 1,
    name: 'MINAS GERAIS'
  }, {
    id: 2,
    name: 'SÃO PAULO'
  }].find(state => state.id === id)
}

export const mockStateEntity: StateEntity = {
  id: 1,
  name: 'MINAS GERAIS',
  initials: 'MG'
}

export const mockCityEntity: CityEntity = {
  id: 1,
  name: 'SÃO SEBASTIÃO DO RIO PRETO',
  ibge: 795987,
  state: mockStateEntity
}