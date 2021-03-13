import { UserModel } from './model'

export interface UserRepository {
  logIn: (usernameOrEmail: string, password: string) => Promise<UserModel>
}
