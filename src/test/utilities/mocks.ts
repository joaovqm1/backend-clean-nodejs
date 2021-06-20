import faker from 'faker'
import { DocumentModel, ProjectModel } from '@/data'
import { Roles } from '@/data/features/user/roles'
import {
  OfficeEntity,
  DocumentEntity,
  UserEntity,
  CustomerSupplierType,
  CustomerSupplierEntity,
  CustomerSupplierClass,
  CityEntity,
  StateEntity,
  FinanceMethodEntity,
  PhasesEntity,
  ScopeEntity,
  ProjectStatusEntity,
  ProjectTypeEntity,
  FinanceTypeEntity,
  FinanceTypeEnum,
  TaskEntity,
  BankEntity,
  CustomerSupplierProfile,
  FinanceEntity,
  FinanceType,
  FinanceStatus,
  TaskStatus,
  ProjectScopeEntity,
  ProjectPhaseEntity,
  ProjectEntity
} from '@/domain'
import { dateUtilities } from '@/main'

/**
 * Objects
 */
export const mockOfficeEntity: OfficeEntity = {
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

export const mockUserEntity: UserEntity = {
  id: 1,
  role: {
    id: 1,
    name: Roles.ADMIN
  },
  cpf: '11111111111',
  email: 'useremail@email.com',
  username: 'username',
  name: 'RUAN CARLOS',
  token: 'acessToken'
}

export const mockDocumentEntity: DocumentEntity = {
  id: 1,
  key: 'Key',
  description: 'TITULO DE DOCUMENTO',
  name: 'NOME DO DOCUMENTO',
  path: '/SRC/DOCUMENTO',
  extension: 'pdf',
  mimeType: 'pdf',
  size: 10
  // project: {
  //   id: 1
  // },
  // projectScope: {
  //   id: 1
  // },
  // projectPhase: {
  //   id: 1
  // },
}

export const mockDocumentModel: DocumentModel = mockDocumentEntity

export function getCityById(id: number): any {
  return [{
    id: 1,
    name: 'SÃO SEBASTIÃO DO RIO PRETO'
  }, {
    id: 2,
    name: 'BELO HORIZONTE'
  }, {
    id: 3,
    name: 'SÃO PAULO'
  }].find(city => city.id === id)
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

export function getBankById(id: number): any {
  return [{
    id: 1,
    name: 'BRADESCO'

  }, {
    id: 2,
    name: 'ITAÚ'
  }].find(bank => bank.id === id)
}

export const mockCustomerSupplierEntity: CustomerSupplierEntity = {
  id: 1,
  name: 'JOSE DA SILVA',
  tradingName: 'TRANDING NAME',
  email: 'email@dominion.com',
  profile: CustomerSupplierProfile.CUSTUMERSUPPLIER,
  type: CustomerSupplierType.LEGAL,
  identityCard: '25456789',
  phone1: '3135511111',
  phone2: '3135511111',
  cellphone1: '31998779999',
  cellphone2: '31998779999',
  birthdate: '28/01/99',
  cpfCnpj: '52889797650',
  address1: 'RUA TESTE',
  address2: 'RUA TESTE2',
  postcode: '35400000',
  addressReference: 'REFERENCIA ENDEREÇO',
  state: {
    id: 1,
    name: 'MINAS GERAIS'
  },
  city: {
    id: 1,
    name: 'OURO PRETO'
  },
  bank: {
    id: 1,
    name: 'BRADESCO'
  },
  neighborhood: 'BAUXITA',
  addressNumber: '123',
  additionalInfo: 'INFO ADICIONAL',
  class: CustomerSupplierClass.CUSTOMER,
  bankAccount: '123456',
  bankBranch: '12',
  addressComplement: 'CASA'
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

export const mockFinanceMethodEntity: FinanceMethodEntity = {
  id: 1,
  description: 'DESCRIÇÃO DO MÉTODO FINANCEIRO'
}

export const mockPhaseEntity: PhasesEntity = {
  id: 1,
  description: 'DESCRIÇÃO DOS PASSOS'
}


export const mockScopeEntity: ScopeEntity = {
  id: faker.datatype.number(),
  description: 'DESCRIÇÃO DO ESCOPO'
}

export const mockProjectStatusEntity: ProjectStatusEntity = {
  id: 1,
  description: 'DESCRIÇÃO DO STATUS DO PROJETO'
}

export const mockProjectTypeEntity: ProjectTypeEntity = {
  id: 1,
  description: 'DESCRIÇÃO DO TIPO DO PROJETO'
}

const randomFinanceType = FinanceTypeEnum[
  faker.helpers.replaceSymbolWithNumber(
    faker.random.arrayElement(Object.getOwnPropertyNames(FinanceTypeEnum))
  )
]

export const mockFinanceTypeEntity: FinanceTypeEntity = {
  id: 1,
  description: 'DESCRIÇÃO DO TIPO DE FINANÇAS',
  type: randomFinanceType
}

export const mockTaskEntity: TaskEntity = {
  id: 1,
  responsible: {
    id: 1,
    username: 'username'
  },
  title: 'TITULO DA TAREFA',
  description: 'TESTE DE TAREFAS',
  status: TaskStatus.OPENED,
  startDate: '2021-03-26',
  finishDate: '2021-04-05',
  startTime: '13:25',
  finishTime: '18:30'
}

export const mockBankEntity: BankEntity = {
  id: 1,
  name: 'BRADESCO',
  number: '12345-6'
}

const randomType = FinanceType[
  faker.helpers.replaceSymbolWithNumber(
    faker.random.arrayElement(Object.getOwnPropertyNames(FinanceType))
  )
]
const randomStatus = FinanceStatus[
  faker.helpers.replaceSymbolWithNumber(
    faker.random.arrayElement(Object.getOwnPropertyNames(FinanceStatus))
  )
]

export const mockFinanceEntity: FinanceEntity = {
  id: 1,
  description: 'TESTE DE FINANCAS',
  customerSupplier: {
    id: 1,
    name: 'FINANCAS'
  },
  type: randomType,
  status: randomStatus,
  finishDate: dateUtilities.format(new Date()),
  dateToFinish: dateUtilities.format(new Date()),
  value: 12,
  financeType: {
    id: 1,
    description: faker.random.word()
  },
  financeMethod: {
    id: 1,
    description: faker.random.word()
  },
  project: {
    id: 1
  }
}

export const mockProjectScopeEntity: ProjectScopeEntity = {
  id: faker.datatype.number(),
  project: {
    id: faker.datatype.number(),
    name: faker.random.word()
  },
  scope: {
    id: faker.datatype.number(),
    description: faker.random.word()
  }
}

export const mockProjectPhaseEntity: ProjectPhaseEntity = {
  id: faker.datatype.number(),
  project: {
    id: faker.datatype.number(),
    name: faker.random.word()
  },
  phase: {
    id: faker.datatype.number(),
    description: faker.random.word()
  },
  startDate: faker.date.past().toISOString().split('T')[0]
}

const mockProjectId = faker.datatype.number()
const mockProjectName = faker.random.word().toUpperCase()

export const mockProjectPaymentEntry: FinanceEntity = {
  id: faker.datatype.number(),
  project: { id: mockProjectId },
  customerSupplier: mockCustomerSupplierEntity,
  description: `Entrada de valor do projeto - obra: ${mockProjectName}`.toUpperCase(),
  status: FinanceStatus.FINISHED,
  type: FinanceType.INCOME,
  finishDate: faker.date.recent().toISOString(),
  financeType: { id: 1, description: 'RECEITA DE PROJETO' },
  value: faker.datatype.number()
}

export const mockProjectFinance: FinanceEntity = {
  id: faker.datatype.number(),
  project: { id: mockProjectId },
  customerSupplier: mockCustomerSupplierEntity,
  description: `Parcela de valor do projeto - obra: ${mockProjectName}`.toUpperCase(),
  status: FinanceStatus.OPENED,
  type: FinanceType.INCOME,
  dateToFinish: faker.date.recent().toISOString(),
  financeType: { id: 1, description: 'RECEITA DE PROJETO' },
  value: faker.datatype.number()
}

export const mockProjectEntity: ProjectEntity = {
  id: mockProjectId,
  customer: mockCustomerSupplierEntity,
  name: mockProjectName,
  projectPhases: [mockProjectPhaseEntity, { ...mockProjectPhaseEntity, id: mockProjectPhaseEntity.id + 1 }],
  projectScopes: [mockProjectScopeEntity, { ...mockProjectScopeEntity, id: mockProjectScopeEntity.id + 1 }],
  projectStatus: mockProjectStatusEntity,
  projectType: mockProjectTypeEntity,
  technicalManager: mockUserEntity,
  startDate: faker.date.past().toISOString(),
  dueDate: faker.date.future().toISOString(),
  finishDate: faker.date.future().toISOString(),
  address: faker.address.streetName().toUpperCase(),
  postcode: '35400000',
  addressComplement: faker.random.word().toUpperCase(),
  addressReference: faker.random.word().toUpperCase(),
  state: {
    id: 1,
    name: 'MINAS GERAIS'
  },
  city: {
    id: 1,
    name: 'OURO PRETO'
  },
  neighborhood: faker.random.word().toUpperCase(),
  addressNumber: faker.datatype.number().toString().toUpperCase(),
  finances: [mockProjectPaymentEntry, mockProjectFinance],
  annotation: faker.random.word().toUpperCase(),
  totalArea: faker.datatype.number(),
  payment: {
    value: mockProjectPaymentEntry.value + mockProjectFinance.value,
    entry: mockProjectPaymentEntry.value,
    interval: 1,
    numberOfFinances: 2,
    financesValue: mockProjectFinance.value,
    firstFinanceDate: mockProjectFinance.dateToFinish
  }
}

export const mockProjectModel: ProjectModel = {
  ...mockProjectEntity,
  customerId: mockProjectEntity.customer.id,
  projectStatusId: mockProjectEntity.projectStatus.id,
  projectTypeId: mockProjectEntity.projectType.id,
  technicalManagerId: mockProjectEntity.technicalManager.id,
  cityId: mockProjectEntity.city.id,
  stateId: mockProjectEntity.state.id
}
