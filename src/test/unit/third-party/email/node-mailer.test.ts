import nodemailer from 'nodemailer'
import sinon from 'sinon'

import { mailConfig } from '@/config'
import { SendEmailParams } from '@/data'
import { NodeMailerImpl } from '@/third-party'

// eslint-disable-next-line max-lines-per-function
describe('Email Sender', function() {
  const emailSender = new NodeMailerImpl()
  class MockTransporter {
    sendMail(): void { }
  }

  const mockTransporter = new MockTransporter()

  it('Should creater transporter and send emails', async function() {
    const params: SendEmailParams = {
      fromAddress: 'from',
      toAddress: 'to',
      subject: 'subject',
      html: 'html'
    }

    sinon.stub(emailSender, 'getTransporter').resolves(mockTransporter)

    const response: any = {
      accepted: ['email'],
      rejected: [],
      envelopeTime: 920,
      messageTime: 678,
      messageSize: 310,
      response: '250 Accepted [STATUS=new MSGID=Xr1DinCFGwQD8tPKXsg4UiSvmwacJwJBAAACd5LcKoJsb5u9ei59lcd5Oz0]',
      envelope:
      {
        from: 'noreply@cachacagestor.com.br',
        to: ['email']
      },
      messageId: '<1af3d1c3-ef43-623c-58b1-5723e33153e5@cachacagestor.com.br>'
    }

    sinon.stub(mockTransporter, 'sendMail').withArgs().returns(response)

    expect(await emailSender.send(params)).toEqual('1af3d1c3-ef43-623c-58b1-5723e33153e5@cachacagestor.com.br')
  })

  it('Should call createTransport from nodemailer', async function() {
    // Arrange
    const createTransportSpy = jest.spyOn(nodemailer, 'createTransport')

    // Act
    await emailSender.getTransporter()

    // Assert
    expect(createTransportSpy).toBeCalledWith({
      host: mailConfig.host,
      port: mailConfig.port,
      auth: {
        user: mailConfig.user,
        pass: mailConfig.password
      }
    })
  })

  it('Should return default from when none is passed', function() {
    // Arrange

    // Act

    // Assert
    expect(emailSender.getFrom()).toEqual('Projetei contato@projetei.com.br')

  })
})

afterEach(function() { sinon.restore() })