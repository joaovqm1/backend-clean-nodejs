import { UniqueConstraintError, ValidationError } from 'sequelize'

import { DatabaseValidationError } from './api/errors'
import { UniqueAttributeError } from '@/domain'
import logger from '@/logger'
import { SequelizeInternalError } from './api/errors/internal'

export class ErrorHandler {
  handleSequelizeError: (error: Error) => Error
}
export class ErrorHandlerImpl implements ErrorHandler {
  constructor(private readonly uniqueConstraintError?: string) {}

  handleSequelizeError(error: Error): Error {
    logger.error(error)
    if (error instanceof UniqueConstraintError) {
      throw new UniqueAttributeError(this.uniqueConstraintError)
    } else if (error instanceof ValidationError) {
      throw new DatabaseValidationError()
    } else {
      throw new SequelizeInternalError()
    }
  }
}
