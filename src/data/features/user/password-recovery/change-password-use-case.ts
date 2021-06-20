import { Authentication } from '@/data/contracts'
import { FilterBuilder } from '@/data/filter-builder'
import {
  ChangePasswordRequestDTO,
  ChangePasswordUseCase,
  InvalidPasswordRecoveryToken,
  ReadCrudUseCase,
  ReadUserResponseDTO,
  UpdateCrudUseCase,
  UpdateUserRequestDTO
} from '@/domain'

export class ChangePasswordUseCaseImpl implements ChangePasswordUseCase {
  private readonly readUserUseCase: ReadCrudUseCase<ReadUserResponseDTO>
  private readonly updateUserUseCase: UpdateCrudUseCase<Partial<UpdateUserRequestDTO>, ReadUserResponseDTO>
  private readonly authentication: Authentication

  constructor(params: {
    readUserUseCase: ReadCrudUseCase<ReadUserResponseDTO>
    updateUserUseCase: UpdateCrudUseCase<UpdateUserRequestDTO, ReadUserResponseDTO>
    authentication: Authentication
  }) {
    this.readUserUseCase = params.readUserUseCase
    this.updateUserUseCase = params.updateUserUseCase
    this.authentication = params.authentication
  }

  async change(request: ChangePasswordRequestDTO): Promise<string> {
    const currentUser = await this.getUserByEmail(request.email)

    if (currentUser.recoveryToken !== request.token) {
      throw new InvalidPasswordRecoveryToken()
    } else {
      await this.updateUserUseCase.update({
        id: currentUser.id,
        recoveryToken: null,
        passwordHash: await this.authentication.createPasswordHash(request.password)
      })

      return 'Senha atualizada com sucesso'
    }
  }

  async getUserByEmail(email: string): Promise<ReadUserResponseDTO> {
    const filters = new FilterBuilder()
      .equalTo('email', email)
      .select(['id', 'recoveryToken'])
      .build()

    return this.readUserUseCase.getOne(filters)
  }
}