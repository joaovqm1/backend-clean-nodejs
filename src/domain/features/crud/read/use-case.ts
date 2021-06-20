import { Filter } from '@/domain/filters'

export interface GetManyResult {
  totalItems?: number
  currentPage?: number
  totalPages?: number
  items: any[]
}

export interface ReadCrudUseCase<ResponseOneDTO, ResponseManyDTO = ResponseOneDTO> {
  getOne: (filters: Filter[]) => Promise<ResponseOneDTO>
  getById: (id: number, extraFilters?: Filter[]) => Promise<ResponseOneDTO>
  getMany: (query: Filter[]) => Promise<{
    totalItems?: number
    currentPage?: number
    totalPages?: number
    items: ResponseManyDTO[]
  }>
}
