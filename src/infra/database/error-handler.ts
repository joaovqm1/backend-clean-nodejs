import { UniqueConstraintError, ValidationError } from 'sequelize'

import { UniqueAttributeError } from '@/domain'

import { DatabaseValidationError } from './api/errors'
import { SequelizeInternalError } from './api/errors/internal'
export class ErrorHandler {
  handleSequelizeError: (error: Error) => Error
}
export class ErrorHandlerImpl implements ErrorHandler {
  constructor(private readonly uniqueConstraintError?: string) { }

  handleSequelizeError(error: Error): Error {
    if (error instanceof UniqueConstraintError) {
      throw new UniqueAttributeError(this.uniqueConstraintError)
    } else if (error instanceof ValidationError) {
      throw new DatabaseValidationError()
    } else {
      throw new SequelizeInternalError()
    }
  }
}
