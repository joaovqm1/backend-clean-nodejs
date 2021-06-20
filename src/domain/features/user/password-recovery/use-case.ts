export interface SendPasswordRecoveryEmailRequestDTO {
  email: string
}

export interface SendPasswordRecoveryEmailUseCase {
  send: (request: SendPasswordRecoveryEmailRequestDTO) => Promise<string>
}

export interface ChangePasswordRequestDTO {
  email: string
  token: string
  password: string
}

export interface ChangePasswordUseCase {
  change: (request: ChangePasswordRequestDTO) => Promise<string>
}

