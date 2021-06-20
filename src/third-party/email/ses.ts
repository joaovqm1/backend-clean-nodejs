
import SES, { Destination, Message, SendEmailRequest } from 'aws-sdk/clients/ses'
import htmlToText from 'html-to-text'
import mailcomposer from 'mailcomposer'

import { EmailSender, SendEmailParams } from '@/data'

export class AWSSESImpl implements EmailSender {
  private readonly ses: SES
  private readonly defaultFromAddress = 'Projetei <contato@projetei.com.br>'
  private readonly noReplyAddress = 'noreply@projetei.com.br'

  constructor() {
    this.ses = new SES({
      region: 'us-east-2'
    })
  }

  async send(params: SendEmailParams): Promise<string> {
    if (params.attachments === undefined) {
      return await this.sendSimpleEmail(params)
    } else {
      return await this.sendEmailWithAttachments(params)
    }
  }

  /* istanbul ignore next */
  async sendSimpleEmail(params: SendEmailParams): Promise<string> {
    const response = await this.ses
      .sendEmail({
        ...this.getSESSendEmailRequest(params)
      }).promise()

    return response.MessageId
  }

  getSESSendEmailRequest(params: SendEmailParams): SendEmailRequest {
    return {
      Source: this.defaultFromAddress,
      Destination: this.getDestination(params.toAddress),
      Message: this.getMessage(params),
      ReplyToAddresses: [this.noReplyAddress]
      // ConfigurationSetName: 'ses'
    }
  }

  getDestination(toAddress: string): Destination {
    return {
      ToAddresses: [
        toAddress
      ]
    }
  }

  getMessage(params: Omit<SendEmailParams, 'fromAddress' | 'toAddress'>): Message {
    const message: Message = {
      Subject: {
        Data: params.subject
      },
      Body: {
      }
    }

    if (params.text) {
      message.Body.Text = {
        Data: params.text
      }
    } else if (params.html) {
      message.Body.Text = {
        Data: this.transformHTMLToText(params.html)
      }
      message.Body.Html = {
        Data: params.html
      }
    }

    return message
  }

  transformHTMLToText(html: string): string {
    return htmlToText.fromString(html, {
      ignoreImage: true,
      preserveNewlines: true,
      wordwrap: 120,
    })
  }

  /* istanbul ignore next */
  async sendEmailWithAttachments(params: SendEmailParams): Promise<string> {
    const mail = mailcomposer({
      ...this.getMailComposerSendParams(params)
    })

    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/space-before-function-paren
      mail.build(async (err: string, message: string) => {
        if (err) {
          reject(new Error(`Error sending raw email: ${err}`))
        } else {
          const response = await this.ses.sendRawEmail({
            RawMessage: {
              Data: message
            }
          }).promise()
          resolve(response.MessageId)
        }
      })
    })
  }

  getMailComposerSendParams(params: SendEmailParams): any {
    return {
      from: this.defaultFromAddress,
      replyTo: this.noReplyAddress,
      to: params.toAddress,
      subject: params.subject,
      text: this.transformHTMLToText(params.html),
      html: params.html,
      attachments: params.attachments,
    }
  }
}
