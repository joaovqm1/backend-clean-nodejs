import { AppError } from '@/domain/app-error'

export class UnauthorizedOfficeAcesssError extends AppError {
  constructor() {
    super({
      name: UnauthorizedOfficeAcesssError.name,
      description: 'Você não possui permissão para acessar esse escritório',
      isExpectedError: true
    })
  }
}

export class UnauthorizedOfficesAcesssError extends AppError {
  constructor() {
    super({
      code: 403,
      name: UnauthorizedOfficeAcesssError.name,
      description: 'Esse recurso está disponível apenas para o administrador do sistema',
      isExpectedError: true
    })
  }
}
