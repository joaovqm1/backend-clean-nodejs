import { AppError } from '@/domain/app-error'

export class InvalidPasswordRecoveryToken extends AppError {
  constructor() {
    super({
      description: 'A código informado não é um código válido',
      name: InvalidPasswordRecoveryToken.name
    })
  }
}