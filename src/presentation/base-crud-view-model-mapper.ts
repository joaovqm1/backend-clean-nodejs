import {
  CreateCrudRequestDTO,
  CreateCrudResponseDTO,
  Filter,
  UpdateCrudRequestDTO,
  UpdateCrudResponse,
} from '@/domain'

export interface BaseCrudViewModelMapper {
  // create
  fromCreateRequestViewModelToCreateRequestDTO?: (request: any) => CreateCrudRequestDTO
  fromCreateResponseDTOToCreateResponseViewModel?: (response: CreateCrudResponseDTO) => any
  // update
  fromUpdateRequestViewModelToUpdateRequestDTO?: (request: any) => UpdateCrudRequestDTO
  fromUpdateResponseDTOToUpdateResponseViewModel?: (response: UpdateCrudResponse) => any
  // read
  fromReadRequestViewModelToFilters: (request: any) => Filter[]
  fromReadOneResponseDTOToReadResponseOneViewModel: (response: any) => any
  fromReadManyResponseDTOToReadResponseOneViewModel: (response: any[]) => any[]
}
