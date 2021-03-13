import { ReadCrudRequestDTO } from './request-dto'

export interface GetManyResult {
  totalItems?: number
  currentPage?: number
  totalPages?: number
  items: any[]
}

export interface ReadCrudUseCase<
  ResponseOneDTO,
  ResponseManyDTO = ResponseOneDTO
> {
  getOne: (query: ReadCrudRequestDTO) => Promise<ResponseOneDTO>
  getMany: (
    query: ReadCrudRequestDTO
  ) => Promise<{
    totalItems?: number
    currentPage?: number
    totalPages?: number
    items: ResponseManyDTO[]
  }>
}
