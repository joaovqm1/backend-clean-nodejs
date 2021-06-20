import faker from 'faker'

import { CreateFinancesForProjectRequestDTO, FinanceStatus } from '@/domain'
import { ProjectPaymentFinance } from '@/domain/features/common'
import { mockCustomerSupplierEntity } from '@/test/utilities/mocks'

export const mockInverval = faker.datatype.number({ min: 1, max: 5 })
export const mockValue = faker.datatype.number({ min: 1000 })

const finances: ProjectPaymentFinance[] = []
for (let i = 0; i < mockInverval; i++) {
  finances.push({
    date: faker.date.future().toISOString(),
    status: faker.datatype.boolean() ? FinanceStatus.OPENED : FinanceStatus.FINISHED,
    value: mockValue / mockInverval
  })
}
export const mockFinances = finances

export const mockProject = {
  id: faker.datatype.number(),
  customer: mockCustomerSupplierEntity,
  name: faker.commerce.productName(),
  payment: {
    entry: faker.datatype.number(),
    interval: mockInverval,
    value: mockValue,
    finances: mockFinances
  }
}

export const mockRequest: CreateFinancesForProjectRequestDTO = {
  project: mockProject,
  payment: {
    entry: faker.datatype.number(),
    interval: mockInverval,
    value: mockValue,
    finances: mockFinances
  }
}
