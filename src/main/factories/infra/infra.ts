import { Authentication } from '@/data'
import {
  AuthenticationImpl,
  SequelizeSchema,
  SequelizeSchemaImpl,
} from '@/infra'

const sequelizeSchemaImpl = new SequelizeSchemaImpl()

export class InfraFactory {
  static getSequelizeSchema(): SequelizeSchema {
    return sequelizeSchemaImpl
  }

  static getAuthentication(): Authentication {
    return new AuthenticationImpl()
  }
}
