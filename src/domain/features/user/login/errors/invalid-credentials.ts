import { AppError } from '@/domain/app-error'

export class InvalidCredentialsError extends AppError {
  constructor() {
    super({
      code: 400,
      name: InvalidCredentialsError.name,
      description: 'Email ou senha inválidos'
    })
  }
}

