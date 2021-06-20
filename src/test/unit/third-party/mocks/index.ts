import { EmailSender, Storage } from '@/data'

export const mockStorage: Storage = {
  remove: jest.fn(),
  upload: jest.fn()
}

export const mockEmailSender: EmailSender = {
  send: jest.fn()
}
