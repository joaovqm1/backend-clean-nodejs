import { AWSSESImpl } from '@/third-party'

import { htmlMounter } from '../factories'

async function main(): Promise<void> {
  const emailSender = new AWSSESImpl()
  console.log(await emailSender.send({
    subject: 'Seja bem vindo',
    html: htmlMounter.mount('welcome'),
    toAddress: 'joaovq@gmail.com'
  }))
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main()
