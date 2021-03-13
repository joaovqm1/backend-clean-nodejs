import { AppError } from '@/domain/app-error'

export class ObjectNotFoundError extends AppError {
  constructor() {
    super({
      name: ObjectNotFoundError.name,
      description: 'Não foi possível localizar um dos objetos usados na consulta'
    })
  }
}
