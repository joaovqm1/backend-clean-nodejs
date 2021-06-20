import faker from 'faker'
import request from 'supertest'

import app from '@/main/config/app'
import { FinanceTypeEnum } from '@/domain'
import { CreateFinanceTypeResponseViewModel, CreateOfficeResponseViewModel } from '@/presentation'

export async function createFinanceType(office: CreateOfficeResponseViewModel): Promise<CreateFinanceTypeResponseViewModel> {
  const randomFinanceType = FinanceTypeEnum[
    faker.helpers.replaceSymbolWithNumber(
      faker.random.arrayElement(Object.getOwnPropertyNames(FinanceTypeEnum))
    )
  ]

  return (await request(app)
    .post('/api/crud/financetypes')
    .set('token', office.user.token)
    .set('officeId', office.id.toString())
    .send({
      data: {
        description: faker.lorem.text(20),
        type: randomFinanceType
      }
    })).body.data
}