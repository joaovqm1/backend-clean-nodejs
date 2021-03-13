import { sequelize } from '@/infra/database/sequelize'
import { Model, INTEGER, STRING, BOOLEAN, DOUBLE } from 'sequelize'

import {
  createrIdSchema,
  createrIdForeignKeyOptions,
  updaterIdSchema,
  updaterIdForeignKeyOptions,
  getForeignKeyOptions,
} from '@/infra/database/utilities'
import Role from './role'

class UserModel extends Model { }

UserModel.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: STRING,
      allowNull: false,
    },
    officeId: {
      type: INTEGER,
      allowNull: false,
    },
    email: {
      type: STRING,
      allowNull: false,
    },
    image: {
      type: STRING,
    },
    imageName: {
      type: STRING,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    passwordHash: {
      type: STRING,
      allowNull: false,
    },
    emailVerified: {
      type: BOOLEAN,
      defaultValue: false,
    },
    token: {
      type: STRING,
    },
    recoveryToken: {
      type: STRING,
    },
    commissionPercentage: {
      type: DOUBLE,
    },
    roleId: {
      type: INTEGER,
      allowNull: false,
    },
    birthdate: {
      type: STRING
    },
    cpf: {
      type: STRING,
      allowNull: false
    },
    createrId: {
      ...createrIdSchema,
      allowNull: true,
    },
    updaterId: {
      ...updaterIdSchema,
      allowNull: true,
    },
  },
  {
    sequelize,
    name: {
      singular: 'user',
      plural: 'users',
    },
    paranoid: true,
    tableName: 'users',
    indexes: [
      {
        fields: ['username'],
        unique: true
      },
      {
        fields: ['email'],
        unique: true
      },
    ],
  }
)

UserModel.belongsTo(UserModel, createrIdForeignKeyOptions)
UserModel.belongsTo(UserModel, updaterIdForeignKeyOptions)
UserModel.belongsTo(Role, getForeignKeyOptions())

export const User = UserModel
export default UserModel
