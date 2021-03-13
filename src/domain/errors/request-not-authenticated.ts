import { AppError } from '@/domain/app-error'

export class RequestNoAuthenticatedError extends AppError {
  constructor() {
    super({
      code: 401,
      name: RequestNoAuthenticatedError.name,
      description: 'Não foi possível localizar o usuário da requisição'
    })
  }
}
