import { AppError } from '@/domain/app-error'
export class ObjectToDeleteNotFound extends AppError {
  constructor() {
    super({
      name: ObjectToDeleteNotFound.name,
      description: 'Não foi possível encontrar o objeto que será deletado',
      isExpectedError: false
    })
  }
}
