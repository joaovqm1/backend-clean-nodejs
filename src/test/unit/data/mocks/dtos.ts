import faker from 'faker'

import { CreateProjectRequestDTO, UploadFileRequestDTO, UploadFileResonseDTO } from '@/domain'
import {
  mockProjectEntity, mockProjectFinance, mockProjectPaymentEntry, mockProjectScopeEntity
} from '@/test/utilities/mocks'

export const mockCreateProjectRequestDTO: CreateProjectRequestDTO = {
  customer: mockProjectEntity.customer,
  name: mockProjectEntity.name,
  projectStatus: mockProjectEntity.projectStatus,
  projectType: mockProjectEntity.projectType,
  startDate: mockProjectEntity.startDate,
  dueDate: mockProjectEntity.dueDate,
  finishDate: mockProjectEntity.finishDate,
  address: mockProjectEntity.address,
  addressComplement: mockProjectEntity.addressComplement,
  city: mockProjectEntity.city,
  addressNumber: mockProjectEntity.addressNumber,
  addressReference: mockProjectEntity.addressReference,
  annotation: mockProjectEntity.annotation,
  neighborhood: mockProjectEntity.neighborhood,
  postcode: mockProjectEntity.postcode,
  state: mockProjectEntity.state,
  technicalManager: mockProjectEntity.technicalManager,
  totalArea: mockProjectEntity.totalArea,
  scopes: [{
    id: mockProjectScopeEntity.scope.id
  }],
  payment: {
    entry: mockProjectPaymentEntry.value,
    interval: 1,
    value: mockProjectPaymentEntry.value + mockProjectFinance.value,
    finances: [{
      ...mockProjectFinance,
      date: mockProjectFinance.dateToFinish
    }]
  }
}

export const mockUploadFileRequestDTO: UploadFileRequestDTO = {
  description: faker.random.word(),
  filename: faker.random.word(),
  mimetype: faker.random.word(),
  originalname: faker.random.word(),
  path: faker.random.word(),
  size: faker.datatype.number()
}

export const mockUploadFileResposeDTO: UploadFileResonseDTO = {
  ...mockUploadFileRequestDTO,
  mimeType: mockUploadFileRequestDTO.mimetype,
  extension: faker.database.type(),
  key: faker.database.column(),
  name: faker.database.column()
}