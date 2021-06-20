import { EmailSender, HTMLMounter, StringUtilities } from '@/data/contracts'
import { FilterBuilder } from '@/data/filter-builder'
import {
  PasswordRecoveryEmailNotFound,
  ReadCrudUseCase,
  ReadUserResponseDTO,
  SendPasswordRecoveryEmailRequestDTO,
  SendPasswordRecoveryEmailUseCase,
  UpdateCrudUseCase,
  UpdateUserRequestDTO
} from '@/domain'

export class SendPasswordRecoveryEmailUseCaseImpl implements SendPasswordRecoveryEmailUseCase {
  private readonly readUserUseCase: ReadCrudUseCase<ReadUserResponseDTO>
  private readonly updateUserUseCase: UpdateCrudUseCase<Partial<UpdateUserRequestDTO>, ReadUserResponseDTO>
  private readonly emailSender: EmailSender
  private readonly htmlMounter: HTMLMounter
  private readonly stringUtilities: StringUtilities

  constructor(params: {
    readUserUseCase: ReadCrudUseCase<ReadUserResponseDTO>
    updateUserUseCase: UpdateCrudUseCase<UpdateUserRequestDTO, ReadUserResponseDTO>
    emailSender: EmailSender
    htmlMounter: HTMLMounter
    stringUtilities: StringUtilities
  }) {
    this.readUserUseCase = params.readUserUseCase
    this.updateUserUseCase = params.updateUserUseCase
    this.emailSender = params.emailSender
    this.htmlMounter = params.htmlMounter
    this.stringUtilities = params.stringUtilities
  }

  async send(request: SendPasswordRecoveryEmailRequestDTO): Promise<string> {
    const currentUser = await this.getUserByEmail(request.email)

    const updatedUser = await this.updateUserUseCase.update({
      id: currentUser.id,
      recoveryToken: this.stringUtilities.getRandomString(6)
    })

    await this.sendEmail(updatedUser)

    return 'Email enviado com sucesso'
  }

  async getUserByEmail(email: string): Promise<ReadUserResponseDTO> {
    const filters = new FilterBuilder()
      .equalTo('email', email)
      .select(['id'])
      .build()

    const user = await this.readUserUseCase.getOne(filters)
    if (user) {
      return user
    } else {
      throw new PasswordRecoveryEmailNotFound()
    }
  }

  async sendEmail(user: Pick<ReadUserResponseDTO, 'email' | 'recoveryToken' | 'name'>): Promise<string> {
    let html = this.htmlMounter.mount('password-recovery')
    html = html.replace('|username|', user.name)
    html = html.replace('|recover-password-token|', user.recoveryToken)

    return this.emailSender.send({
      toAddress: user.email,
      subject: 'Recupere sua senha do Projetei',
      html
    })
  }
}