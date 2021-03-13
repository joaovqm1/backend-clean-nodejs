import { AppError } from '@/domain/app-error'

export class MissingIdError extends AppError {
  constructor() {
    super({
      code: 400,
      name: MissingIdError.name,
      description: 'É preciso informar o id do escritório'
    })
  }
}
