import { AppError } from '@/domain/app-error'

export class RequestNoAuthenticatedError extends AppError {
  constructor() {
    super({
      code: 401,
      name: RequestNoAuthenticatedError.name,
      description: 'Você parece não ter acesso para acessar esse recurso'
    })
  }
}
