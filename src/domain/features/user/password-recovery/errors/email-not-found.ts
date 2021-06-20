import { AppError } from '@/domain/app-error'

export class PasswordRecoveryEmailNotFound extends AppError {
  constructor() {
    super({
      description: 'Não há nenhum usuário vinculado a esse email',
      name: PasswordRecoveryEmailNotFound.name
    })
  }
}