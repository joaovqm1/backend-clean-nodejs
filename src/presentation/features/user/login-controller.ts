import {
  Controller,
  HttpResponse,
  serverError,
  ok,
} from '@/presentation/contracts'
import { LogInRequestDTO, LogInResponseDTO, LogInUseCase } from '@/domain'

export class LoginController implements Controller {
  constructor(private readonly logInUseCase: LogInUseCase) {}

  async handle(body: LogInRequestDTO): Promise<HttpResponse<LogInResponseDTO>> {
    try {
      const response: LogInResponseDTO = await this.logInUseCase.logIn(body)
      return ok(response)
    } catch (error) {
      return serverError(error)
    }
  }
}
