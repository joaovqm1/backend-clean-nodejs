import bcrypt from 'bcryptjs'

import { Authentication } from '@/data'

export class AuthenticationImpl implements Authentication {
  async createPasswordHash(password: string): Promise<string> {
    return await bcrypt.hash(password, 8)
  }

  async comparePasswordAndHash(password: string, hash: string = ''): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }
}

export const authentication = new AuthenticationImpl()
