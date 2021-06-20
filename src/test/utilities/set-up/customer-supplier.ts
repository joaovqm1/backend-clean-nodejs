
import faker from 'faker'
import fakerBr from 'faker-br'
import request from 'supertest'

import app from '@/main/config/app'
import { formatedZipCode, phoneFormat } from '../fakes'
import { CustomerSupplierType, CustomerSupplierProfile, BankAccountType } from '@/domain'
import { dateUtilities } from '@/main'
import { CreateCustomerSupplierRequestViewModel, CreateCustomerSupplierResponseViewModel, CreateOfficeResponseViewModel } from '@/presentation'

export async function createCustomerSupplier(office: CreateOfficeResponseViewModel): Promise<CreateCustomerSupplierResponseViewModel> {
  const createRequestViewModel: CreateCustomerSupplierRequestViewModel = (await getRandomCreateCustomerSupplierViewModel()).viewModel
  return (await request(app)
    .post('/api/crud/customerssuppliers')
    .set('token', office.user.token)
    .set('officeId', office.id.toString())
    .send({
      data: createRequestViewModel
    })).body.data
}

export async function getRandomCreateCustomerSupplierViewModel(): Promise<{ metadata?: any, viewModel: CreateCustomerSupplierRequestViewModel }> {
  const randomProfile = CustomerSupplierProfile[
    faker.helpers.replaceSymbolWithNumber(
      faker.random.arrayElement(Object.getOwnPropertyNames(CustomerSupplierProfile))
    )
  ]
  const randomCustomerSupplierType = CustomerSupplierType[
    faker.helpers.replaceSymbolWithNumber(
      faker.random.arrayElement(Object.getOwnPropertyNames(CustomerSupplierType))
    )
  ]
  const randomBankAccount = BankAccountType[
    faker.helpers.replaceSymbolWithNumber(
      faker.random.arrayElement(Object.getOwnPropertyNames(BankAccountType))
    )
  ]

  return {
    viewModel: {
      name: faker.name.findName(),
      tradingName: faker.name.findName(),
      email: faker.internet.email(),
      profile: randomProfile,
      type: randomCustomerSupplierType,
      cellphone1: faker.phone.phoneNumber(phoneFormat),
      cellphone2: faker.phone.phoneNumber(phoneFormat),
      phone1: faker.phone.phoneNumber(phoneFormat),
      phone2: faker.phone.phoneNumber(phoneFormat),
      website: faker.internet.url(),
      birthdate: dateUtilities.format(faker.date.past()),
      cpfCnpj: randomCustomerSupplierType === CustomerSupplierType.LEGAL ? fakerBr.br.cnpj() : fakerBr.br.cpf(),
      identityCard: fakerBr.br.rg(),
      address1: faker.address.streetName(),
      address2: faker.address.streetName(),
      postcode: formatedZipCode(),
      addressReference: faker.random.word(),
      state: {
        id: faker.datatype.number({ min: 1, max: 2 })
      },
      city: {
        id: faker.datatype.number({ min: 1, max: 3 })
      },
      neighborhood: faker.random.word(),
      addressNumber: faker.datatype.number().toString(),
      addressComplement: faker.random.word(),
      additionalInfo: faker.random.word(),
      bank: {
        id: faker.datatype.number({ min: 1, max: 2 })
      },
      bankBranch: faker.random.word(),
      bankAccount: faker.random.word(),
      bankAccountType: randomBankAccount
    }
  }
}