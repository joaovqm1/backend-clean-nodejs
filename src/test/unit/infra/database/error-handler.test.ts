import { UniqueConstraintError, ValidationError } from 'sequelize'
import { ErrorHandlerImpl } from '@/infra'
import logger from '@/logger'
import sinon from 'sinon'

describe('Error Handler Impl', () => {
  const errorHandlerImpl: ErrorHandlerImpl = new ErrorHandlerImpl('Error message')

  beforeEach(() => {
    sinon.stub(logger, 'error')
      .withArgs(ValidationError)
  })

  it('Should returns SequelizeError if errorUniqueConstraintError', async () => {
    const errorUniqueConstraintError = new UniqueConstraintError()
    try {
      errorHandlerImpl.handleSequelizeError(errorUniqueConstraintError)
    } catch (e) {
      expect(e.message).toBe('Error message')
    }

    await expect(async function() {
      await errorHandlerImpl.handleSequelizeError(errorUniqueConstraintError)
    }).rejects.toThrow()
  })

  it('Should returns SequelizeError if ValidationError', async () => {
    const errorValidationError = new ValidationError('Não foi possível adicionar/atualizar o objeto. Verifique se os campos obrigatórios forem preenchidos')
    try {
      errorHandlerImpl.handleSequelizeError(errorValidationError)
    } catch (e) {
      expect(e.message).toBe('Não foi possível adicionar/atualizar o objeto. Verifique se os campos obrigatórios forem preenchidos')
    }

    await expect(async function() {
      await errorHandlerImpl.handleSequelizeError(errorValidationError)
    }).rejects.toThrowError(new ValidationError('Não foi possível adicionar/atualizar o objeto. Verifique se os campos obrigatórios forem preenchidos').message)
  })

  it('Should returns SequelizeError ', async () => {
    const errorValidationError = new Error('Error Message')
    try {
      errorHandlerImpl.handleSequelizeError(errorValidationError)
    } catch (e) {
      expect(e.message).toBe('Ocorreu um erro durante a conexão com o banco de dados')
    }

    await expect(async function() {
      await errorHandlerImpl.handleSequelizeError(errorValidationError)
    }).rejects.toThrowError(new Error().message)
  })
})

afterEach(() => {
  sinon.restore()
})
