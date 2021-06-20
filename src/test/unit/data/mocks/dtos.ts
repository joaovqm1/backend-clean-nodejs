import faker from 'faker'

import { UploadFileRequestDTO, UploadFileResonseDTO } from '@/domain'

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