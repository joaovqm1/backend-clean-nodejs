import { AppError } from '@/domain/app-error'

export class ReadObjectNotFoundError extends AppError {
  constructor() {
    super({
      name: ReadObjectNotFoundError.name,
      description: 'Objeto não encontrado',
      isExpectedError: false
    })
  }
}
