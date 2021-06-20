import { AppError } from '@/domain/app-error'
import logger from '@/logger'

export type HttpResponse<T = any> = {
  statusCode: number
  data: T
}

export function serverError(error: Error): HttpResponse {
  console.log(error)
  if (error instanceof AppError && error.isExpectedError) {
    return {
      statusCode: error.code || 500,
      data: error.message,
    }
  } else {
    logger.error(error.stack)
    logger.emptyLine()
    return {
      statusCode: 500,
      data: 'Ocorreu um erro inesperado com sua requisição. Por favor, entre em contato com o suporte',
    }
  }
}

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  data,
})
