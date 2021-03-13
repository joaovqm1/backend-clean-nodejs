import { AppError } from '@/domain/app-error'

export class ObjectToUpdateNotFoundError extends AppError {
  constructor() {
    super({
      name: ObjectToUpdateNotFoundError.name,
      description: 'Não foi possível encontrar o objeto que será atualizado',
      isExpectedError: false
    })
  }
}
