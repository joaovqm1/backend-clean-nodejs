import { AppError } from '@/domain/app-error'

export class EntityNotFoundError extends AppError {
  constructor(description: string) {
    super({
      code: 400,
      name: EntityNotFoundError.name,
      description,
      isExpectedError: false
    })
  }
}
