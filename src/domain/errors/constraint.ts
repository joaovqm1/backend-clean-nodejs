import { AppError } from '@/domain/app-error'

export class UniqueAttributeError extends AppError {
  constructor(description: string) {
    super({
      code: 403,
      name: UniqueAttributeError.name,
      description,
    })
  }
}
