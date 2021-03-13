import { AppError } from '@/domain/app-error'

export class ModelNotFoundError extends AppError {
  constructor(description: string) {
    super({
      code: 500,
      name: ModelNotFoundError.name,
      description,
      isExpectedError: false
    })
  }
}
