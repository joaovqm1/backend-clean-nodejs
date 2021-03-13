import { AppError } from '@/domain/app-error'

export class SequelizeInternalError extends AppError {
  constructor() {
    super({
      code: 500,
      name: SequelizeInternalError.name,
      description: 'Ocorreu um erro durante a conexão com o banco de dados'
    })
  }
}
