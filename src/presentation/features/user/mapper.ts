import { BaseCrudViewModelMapper } from '@/presentation/base-crud-view-model-mapper'
import {
  CreateUserRequestDTO,
  CreateUserResponseDTO,
  ReadCrudRequestDTO,
  ReadUserResponseDTO,
  UpdateUserRequestDTO,
  UpdateUserResponseDTO,
  UserEntity,
  userFieldsToInclude,
} from '@/domain'
import { fromAnyReadRequestToReadRequestDTO, StringUtilities } from '@/data'

export interface CreateUserRequestViewModel extends CreateUserRequestDTO { }
export interface CreateUserResponseViewModel extends CreateUserResponseDTO { }

export interface UpdateUserRequestViewModel extends UpdateUserRequestDTO { }
export interface UpdateUserResponseViewModel extends UpdateUserResponseDTO { }

export interface ReadUserResponseViewModel extends UserEntity { }

export interface ReadUserRequestViewModel {
  id?: number
  username?: string
  email?: string
  fields?: string[]
}

export class UserViewModelMapper implements BaseCrudViewModelMapper {
  constructor(private readonly stringUtilities: StringUtilities) { }

  fromCreateRequestViewModelToCreateRequestDTO(
    request: CreateUserRequestViewModel
  ): CreateUserRequestDTO {
    return this.fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(
      request
    ) as CreateUserRequestDTO
  }

  fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(
    request: CreateUserRequestViewModel | UpdateUserRequestViewModel
  ): CreateUserRequestDTO | UpdateUserRequestDTO {
    return {
      ...request,
      name: request.name.toUpperCase(),
      cpf: this.stringUtilities.removeSpecialCharactersFromString(request.cpf.toUpperCase(),)
    }
  }

  fromCreateResponseDTOToCreateResponseViewModel(
    response: CreateUserResponseDTO
  ): CreateUserResponseViewModel {
    return response
  }

  fromUpdateRequestViewModelToUpdateRequestDTO(
    request: UpdateUserRequestViewModel
  ): UpdateUserRequestDTO {
    return this.fromCreateUpdateRequestViewModelToCreateUpdateRequestDTO(
      request
    ) as UpdateUserRequestDTO
  }

  fromUpdateResponseDTOToUpdateResponseViewModel(
    response: UpdateUserResponseDTO
  ): UpdateUserRequestViewModel {
    return response
  }

  fromReadOneResponseDTOToReadResponseOneViewModel(
    response: ReadUserResponseDTO
  ): ReadUserResponseViewModel {
    return response
  }

  fromReadManyResponseDTOToReadResponseOneViewModel(
    response: ReadUserResponseDTO[]
  ): ReadUserResponseViewModel[] {
    return response.map(this.fromReadOneResponseDTOToReadResponseOneViewModel)
  }

  fromReadRequestViewModelToReadRequestDTO(request: ReadUserRequestViewModel): ReadCrudRequestDTO {
    return fromAnyReadRequestToReadRequestDTO({ request, fieldsToInclude: userFieldsToInclude })
  }
}
