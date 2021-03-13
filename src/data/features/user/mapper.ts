import { StringUtilities } from '@/data/contracts'
import { BaseModelMapper } from '@/data/mapper'
import {
  CreateUserForOfficeRequestDTO,
  CreateUserRequestDTO,
  ReadUserResponseDTO,
  UpdateUserRequestDTO
} from '@/domain/features'
import { UserModel } from './model'

export class UserModelMapper implements BaseModelMapper {
  constructor(private readonly stringUtilities: StringUtilities) { }

  fromCreateRequestDTOToModel(
    request: CreateUserRequestDTO
  ): Omit<UserModel, 'id' | 'token' | 'officeId'> {
    return {
      ...request,
      roleId: request.role.id,
      role: undefined
    }
  }

  fromCreateUserForOfficeRequestToCreateUserRequest(
    request: CreateUserForOfficeRequestDTO
  ): CreateUserRequestDTO {
    return {
      ...request,
      role: {
        id: 1,
      },
      token: this.stringUtilities.getRandomString(),
    }
  }

  fromUpdateRequestDTOToModel(
    request: UpdateUserRequestDTO
  ): Omit<UserModel, 'officeId' | 'token'> {
    return {
      ...request,
      roleId: request.role.id,
      role: undefined,
    }
  }

  fromModelToReadOneResponse(model: UserModel): ReadUserResponseDTO {
    delete model.passwordHash

    return {
      id: model.id,
      role: {
        id: model.roleId,
        name: model.role?.name,
      },
      token: undefined,
      ...model,
    }
  }

  fromModelToReadManyResponse(models: UserModel[]): ReadUserResponseDTO[] {
    return models.map(this.fromModelToReadOneResponse.bind(this))
  }
}
