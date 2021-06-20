import faker from 'faker'
import request from 'supertest'

import app from '@/main/config/app'

export async function createFinanceMethod(office: any) {
  return (await request(app)
    .post('/api/crud/financeMethods')
    .set('token', office.user.token)
    .set('officeId', office.id.toString())
    .send({
      data: {
        description: faker.internet.userName()
      }
    })).body.data
}
