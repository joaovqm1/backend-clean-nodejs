import faker from 'faker'
import sinon from 'sinon'

import { SendEmailParams } from '@/data'
import { AWSSESImpl } from '@/third-party'

describe('AWS SES', function() {
  const ses = new AWSSESImpl()

  const mockParams: SendEmailParams = {
    toAddress: faker.internet.email(),
    subject: faker.random.word(),
    text: faker.random.words()
  }

  const mockParamsWithAttachments: SendEmailParams = {
    ...mockParams,
    attachments: [{
      path: faker.random.word(),
      filename: faker.random.word()
    }]
  }

  const mockParamsWithHTML: SendEmailParams = {
    ...mockParams,
    text: undefined,
    html: '<h1/>'
  }

  const mockResponse = faker.datatype.uuid()

  it('Should call sendSimpleEmail and return response', async function() {
    // Arrange
    sinon.stub(ses, 'sendSimpleEmail').withArgs(mockParams).resolves(mockResponse)

    // Act
    const receivedResponse = await ses.send(mockParams)

    // Assert
    const expectedResponse = mockResponse
    expect(receivedResponse).toEqual(expectedResponse)
  })

  it('Should call sendSimpleEmail and return response', async function() {
    // Arrange
    sinon.stub(ses, 'sendEmailWithAttachments').withArgs(mockParamsWithAttachments).resolves(mockResponse)

    // Act
    const receivedResponse = await ses.send(mockParamsWithAttachments)

    // Assert
    const expectedResponse = mockResponse
    expect(receivedResponse).toEqual(expectedResponse)
  })

  it('Should return send ses email params', async function() {
    // Arrange

    // Act
    const receivedParams = ses.getSESSendEmailRequest(mockParams)

    // Assert
    const expectedParams = {
      Source: 'Projetei <contato@projetei.com.br>',
      Destination: {
        ToAddresses: [
          mockParams.toAddress
        ]
      },
      Message: {
        Subject: {
          Data: mockParams.subject
        },
        Body: {
          Text: {
            Data: mockParams.text
          }
        }
      },
      ReplyToAddresses: ['noreply@projetei.com.br']
    }
    expect(receivedParams).toEqual(expectedParams)
  })

  it('Should return message with html body', function() {
    // Arrange
    // Act
    const receivedMessage = ses.getMessage(mockParamsWithHTML)

    // Assert
    const expectedMessage = {
      Subject: { Data: mockParamsWithHTML.subject },
      Body: {
        Text: {
          Data: ''
        },
        Html: {
          Data: mockParamsWithHTML.html
        }
      }
    }
    expect(receivedMessage).toEqual(expectedMessage)
  })

  it('Should return mail composer params', function() {
    // Arrange
    // Act
    const receivedParams = ses.getMailComposerSendParams(mockParamsWithHTML)

    // Assert
    const expectedParams = {
      from: 'Projetei <contato@projetei.com.br>',
      replyTo: 'noreply@projetei.com.br',
      to: mockParamsWithHTML.toAddress,
      subject: mockParamsWithHTML.subject,
      text: '',
      html: mockParamsWithHTML.html,
      attachments: mockParamsWithHTML.attachments,
    }
    expect(receivedParams).toEqual(expectedParams)
  })
})

afterEach(() => sinon.restore())