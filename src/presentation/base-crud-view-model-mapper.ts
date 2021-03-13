import {
  CreateCrudRequestDTO,
  CreateCrudResponseDTO,
  ReadCrudRequestDTO,
  UpdateCrudRequestDTO,
  UpdateCrudResponse,
} from '@/domain/features/crud'

export interface BaseCrudViewModelMapper {
  // create
  fromCreateRequestViewModelToCreateRequestDTO?: (
    request: any
  ) => CreateCrudRequestDTO
  fromCreateResponseDTOToCreateResponseViewModel?: (
    response: CreateCrudResponseDTO
  ) => any
  // update
  fromUpdateRequestViewModelToUpdateRequestDTO?: (
    request: any
  ) => UpdateCrudRequestDTO
  fromUpdateResponseDTOToUpdateResponseViewModel?: (
    response: UpdateCrudResponse
  ) => any
  // read
  fromReadRequestViewModelToReadRequestDTO: (request: any) => ReadCrudRequestDTO
  fromReadOneResponseDTOToReadResponseOneViewModel: (response: any) => any
  fromReadManyResponseDTOToReadResponseOneViewModel: (response: any[]) => any[]
}
