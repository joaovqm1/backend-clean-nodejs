import faker from 'faker'
import fakerBr from 'faker-br'
import request from 'supertest'

import app from '@/main/config/app'
import { CreateOfficeResponseViewModel, CreateUserResponseViewModel } from '@/presentation'

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

export async function createUser(office: CreateOfficeResponseViewModel): Promise<CreateUserResponseViewModel> {
  return (await request(app)
    .post('/api/crud/users')
    .set('token', office.user.token)
    .set('officeId', office.id.toString())
    .send({
      data: {
        role: {
          id: faker.datatype.number({
            min: 1,
            max: 2
          })
        },
        cpf: fakerBr.br.cpf({ format: true }),
        email: faker.internet.email(),
        name: faker.name.findName(),
        password: faker.internet.password(),
        username: faker.name.findName()
      }
    })).body.data
}
