import { AppError } from '@/domain/app-error'

export class DatabaseValidationError extends AppError {
  constructor() {
    super({
      code: 403,
      name: 'DatabaseValidationError',
      description: 'Não foi possível adicionar/atualizar o objeto. Verifique se os campos obrigatórios forem preenchidos'
    })
  }
}
