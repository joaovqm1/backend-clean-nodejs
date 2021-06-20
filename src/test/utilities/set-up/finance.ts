import faker from 'faker'
import request from 'supertest'

import app from '@/main/config/app'
import { FinanceStatus, FinanceType } from '@/domain'
import {
  CreateFinanceRequestViewModel,
  CreateFinanceResponseViewModel,
  CreateOfficeResponseViewModel,
  FinanceStatusViewModel
} from '@/presentation'
import { createCustomerSupplier } from './customer-supplier'
import { createFinanceType } from './finance-type'
import { createFinanceMethod } from './finance-method'

export async function createFinance(
  type: FinanceType, office: CreateOfficeResponseViewModel
): Promise<CreateFinanceResponseViewModel> {
  const params = await getRandomCreateFinanceViewModel({ type, office })

  return (await request(app)
    .post(`/api/crud/${type === FinanceType.INCOME ? 'incomes' : 'expenses'}`)
    .set('token', office.user.token)
    .set('officeId', office.id.toString())
    .send({
      data: params.viewModel
    })).body.data
}

export async function getRandomCreateFinanceViewModel(
  params: {
    type: FinanceType
    office: CreateOfficeResponseViewModel
  }
): Promise<{ metadata: any, viewModel: CreateFinanceRequestViewModel }> {
  const { type, office } = params

  const customerSupplier = await createCustomerSupplier(office)
  const financeType = await createFinanceType(office)
  const financeMethod = await createFinanceMethod(office)

  let randomStatus: FinanceStatusViewModel
  if (type === FinanceType.INCOME) {
    randomStatus = faker.datatype.boolean() ? FinanceStatusViewModel.NOTRECEIVED : FinanceStatusViewModel.RECEIVED
  } else {
    randomStatus = faker.datatype.boolean() ? FinanceStatusViewModel.UNPAID : FinanceStatusViewModel.PAID
  }

  return {
    metadata: {
      customerSupplier,
      financeType,
      financeMethod
    },
    viewModel: {
      description: faker.lorem.text(20),
      customerSupplier: { id: customerSupplier.id },
      status: randomStatus,
      finishDate: new Date().toISOString().split('T')[0],
      dateToFinish: new Date().toISOString().split('T')[0],
      value: faker.datatype.number(),
      financeType: { id: financeType.id },
      financeMethod: { id: financeMethod.id }
    }
  }
}
