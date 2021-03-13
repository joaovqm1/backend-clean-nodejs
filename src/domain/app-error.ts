interface Params {
  code?: number
  name: string
  description: string
  isExpectedError?: boolean
}

export class AppError extends Error {
  public readonly code: number
  public readonly name: string
  public readonly description: string
  public readonly isExpectedError: boolean

  constructor(params: Params) {
    super(params.description)

    this.code = params.code || 500
    this.name = params.name
    this.description = params.description
    this.isExpectedError = params.isExpectedError !== undefined ? params.isExpectedError : true

    Object.setPrototypeOf(this, new.target.prototype)

    this.name = params.name
    this.isExpectedError = params.isExpectedError

    Error.captureStackTrace(this)
  }
}
