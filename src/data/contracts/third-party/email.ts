export interface SendEmailParams {
  fromAddress?: string
  toAddress: string
  subject: string
  html?: string
  text?: string
  attachments?: Attachments[]
}

interface Attachments {
  filename: string
  path: string
}
export interface EmailSender {
  send: (params: SendEmailParams) => Promise<string>
}
