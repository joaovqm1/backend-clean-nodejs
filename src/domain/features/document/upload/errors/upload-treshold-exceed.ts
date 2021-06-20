import { AppError } from '@/domain/app-error'

export class UploadTresholdExceedError extends AppError {
  constructor() {
    super({
      description: 'Você o limite de 500mb de uploads de arquivos. Para fazer novos uploads você deve migrar o plano ou remover alguns arquivos',
      name: UploadTresholdExceedError.name
    })
  }
}