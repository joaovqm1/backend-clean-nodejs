import {
  LogInRequestDTO,
  LogInResponseDTO,
  LogInUseCase,
  OfficeEntity,
  ReadOfficeUseCase,
} from '@/domain'
import { UserModel } from '../model'

import { UserRepository } from '../repository'

interface Params {
  repository: UserRepository
  readOfficeUseCase: ReadOfficeUseCase
}
export class LogInUseCaseImpl implements LogInUseCase {
  private readonly repository: UserRepository
  private readonly readOfficeUseCase: ReadOfficeUseCase

  constructor(params: Params) {
    this.repository = params.repository
    this.readOfficeUseCase = params.readOfficeUseCase
  }

  async logIn(request: LogInRequestDTO): Promise<LogInResponseDTO> {
    const userModel: UserModel = await this.repository.logIn(
      request.usernameOrEmail,
      request.password
    )
    const officeEntity: OfficeEntity = await this.readOfficeUseCase.getOfficeForLoggedUser(
      userModel.officeId
    )
    return {
      ...userModel,
      role: userModel.role,
      office: officeEntity,
    }
  }
}
