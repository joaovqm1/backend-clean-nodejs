import {
  Authentication,
  FilterBuilder,
  ReadCrudRepository,
  StringUtilities,
  UpdateCrudRepository,
  UserModel,
  UserRepository,
} from '@/data'
import { Filter, InvalidCredentialsError } from '@/domain'

interface Params {
  readUserCrudRepository: ReadCrudRepository
  updateUserCrudRepository: UpdateCrudRepository
  authentication: Authentication
  stringUtilities: StringUtilities
}
export class UserRepositoryImpl implements UserRepository {
  private readonly readUserCrudRepository: ReadCrudRepository
  private readonly updateUserCrudRepository: UpdateCrudRepository
  private readonly authentication: Authentication
  private readonly stringUtilities: StringUtilities

  constructor(params: Params) {
    this.readUserCrudRepository = params.readUserCrudRepository
    this.updateUserCrudRepository = params.updateUserCrudRepository
    this.authentication = params.authentication
    this.stringUtilities = params.stringUtilities
  }

  async logIn(usernameOrEmail: string, password: string): Promise<UserModel> {
    const user = await this.getUserByEmailOrUsername(usernameOrEmail)
    const isValidPassword = await this.authentication.comparePasswordAndHash(
      password,
      user?.passwordHash
    )
    if (isValidPassword) {
      user.token = await this.createNewTokenForUser(user)
      return user
    } else {
      throw new InvalidCredentialsError()
    }
  }

  async getUserByEmailOrUsername(usernameOrEmail: string): Promise<UserModel> {
    let filterBuilder = new FilterBuilder()

    if (usernameOrEmail.includes('@')) {
      filterBuilder = filterBuilder.equalTo('email', usernameOrEmail)
    } else {
      filterBuilder = filterBuilder.equalTo('username', usernameOrEmail)
    }

    const filters: Filter[] = filterBuilder
      .include(['role.id', 'role.name'])
      .build()

    return this.readUserCrudRepository.getOne(filters)
  }

  async createNewTokenForUser(user: UserModel): Promise<string> {
    const updatedUser = await this.updateUserCrudRepository.update({
      id: user.id,
      token: this.stringUtilities.getRandomString(),
    })

    return updatedUser.token
  }
}
