import { CreateCrudUseCase, DeleteCrudUseCase, ReadCrudUseCase, UpdateCrudUseCase, UploadFile } from '@/domain'

export const mockReadCrudUseCase: ReadCrudUseCase<any> = {
  getOne: jest.fn(),
  getMany: jest.fn(),
  getById: jest.fn()
}

export const mockUpdateCrudUseCase: UpdateCrudUseCase<any, any> = {
  update: jest.fn()
}

export const mockCreateCrudUseCase: CreateCrudUseCase<any, any> = {
  create: jest.fn()
}

export const mockDeleteCrudUseCase: DeleteCrudUseCase = {
  delete: jest.fn()
}

export const mockUploadFileUseCase: UploadFile = {
  upload: jest.fn()
}
