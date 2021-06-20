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
        id: 2,
      },
      token: this.stringUtilities.getRandomString(),
    }
  }

  fromUpdateRequestDTOToModel(
    request: UpdateUserRequestDTO
  ): Partial<UserModel> {
    const model: Partial<UserModel> = {
      ...request,
      role: undefined,
    }

    if (request.role) {
      model.roleId = request.role?.id
    }

    return model
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
