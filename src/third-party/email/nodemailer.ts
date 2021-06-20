import nodemailer from 'nodemailer'

import { mailConfig } from '@/config'
import { EmailSender, SendEmailParams } from '@/data'

export class NodeMailerImpl implements EmailSender {
  private readonly defaultFrom: string

  constructor() {
    this.defaultFrom = 'Projetei contato@projetei.com.br'
  }

  async send(params: SendEmailParams): Promise<string> {
    const transporter = await this.getTransporter()

    const response = await transporter.sendMail({
      to: params.toAddress,
      subject: params.subject,
      text: params.text,
      html: params.html,
      attachments: params.attachments,
      from: this.getFrom(params.fromAddress)
    })
    return response.messageId.replace('<', '').replace('>', '').trim()
  }

  async getTransporter(): Promise<any> {
    return nodemailer.createTransport({
      host: mailConfig.host,
      port: mailConfig.port,
      auth: {
        user: mailConfig.user,
        pass: mailConfig.password
      }
    })
  }

  getFrom(from?: string): string {
    return from || this.defaultFrom
  }
}
