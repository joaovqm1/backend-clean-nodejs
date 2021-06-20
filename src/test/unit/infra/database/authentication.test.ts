import { AuthenticationImpl } from '@/infra'
import bcrypt from 'bcryptjs'
import sinon from 'sinon'

describe('Authentication', () => {
  const authenticationImpl: AuthenticationImpl = new AuthenticationImpl()

  const password1 = 'password1'
  const password2 = 'password2'

  it('Should create Password hash', async () => {
    //Arrange
    sinon.stub(bcrypt, 'hash')
      .withArgs('1', 8)
      .resolves('$2a$08$VbuCaTw1iBbSFn66ASWyVuLUD9qRiM.2f9sI4dTs9sFoBOaCY5gTm')

    //Act and Assert
    expect(await authenticationImpl.createPasswordHash('1'))
      .toBe('$2a$08$VbuCaTw1iBbSFn66ASWyVuLUD9qRiM.2f9sI4dTs9sFoBOaCY5gTm')
  })

  it('Should compare password and hash and return false', async () => {
    sinon.stub(bcrypt, 'compare')
      .withArgs(password1, password2)
      .resolves(false)

    //Act and Assert
    expect(await authenticationImpl.comparePasswordAndHash(password1, password2)).toBe(false)
  })

  it('Should compare password and empty hash and return false', async () => {
    sinon.stub(bcrypt, 'compare')
      .withArgs(password1, '')
      .resolves(false)

    //Act and Assert
    expect(await authenticationImpl.comparePasswordAndHash(password1)).toBe(false)
  })

  it('Should compare password and hash and return true', async () => {
    sinon.stub(bcrypt, 'compare')
      .withArgs(password1, password2)
      .resolves(true)

    //Act and Assert
    expect(await authenticationImpl.comparePasswordAndHash(password1, password2)).toBe(true)
  })
})

afterEach(() => sinon.restore())
