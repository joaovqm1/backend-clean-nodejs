import faker from 'faker'
import fakerBr from 'faker-br'
import request from 'supertest'

import app from '@/main/config/app'
import {
  CreateOfficeRequestViewModel,
  CreateOfficeResponseViewModel
} from '@/presentation'
import { formatedPhone, formatedIe, formatedZipCode } from './fakes'

export async function createOffice(name: string): Promise<CreateOfficeResponseViewModel> {
  const createOfficeRequestViewModel: CreateOfficeRequestViewModel = {
    user: {
      username: name.replace(/\s/g, '').toLowerCase(),
      password: 'test'
    },
    email: faker.internet.email(),
    name,
    tradingName: faker.company.companyName(),
    owner: faker.name.findName(),
    cnpj: fakerBr.br.cnpj({ format: true }),
    cpf: fakerBr.br.cpf({ format: true }),
    cellphone: formatedPhone(),
    plan: {
      id: 1
    },
    state: {
      id: 1
    },
    city: {
      id: 1
    },
    postcode: formatedZipCode(),
    address: faker.address.streetName(),
    neighborhood: faker.address.streetAddress(),
    addressNumber: faker.address.streetSuffix()
  }

  const response = await request(app)
    .post('/api/crud/offices')
    .send({
      data: createOfficeRequestViewModel
    })

  return response.body.data
}

export async function logIn(username: string = 'test', password: string = 'test'): Promise<any> {
  const crendetialsQuery = {
    usernameOrEmail: username,
    password: password
  }

  const response = await request(app)
    .get('/api/users/login')
    .query(crendetialsQuery)
    .send()

  return response.body.data
}