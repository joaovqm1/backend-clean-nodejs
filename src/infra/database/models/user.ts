import { BOOLEAN, DOUBLE, INTEGER, Model, STRING } from 'sequelize'

import { sequelize } from '@/infra/database/sequelize'
import {
  createrIdForeignKeyOptions,
  createrIdSchema,
  getForeignKeyOptions,
  idSchema,
  updaterIdForeignKeyOptions,
  updaterIdSchema,
} from '@/infra/database/utilities'

import Role from './role'

class UserModel extends Model { }
UserModel.init(
  {
    id: idSchema,
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
      defaultValue: 2
    },
    birthdate: {
      type: STRING
    },
    cpf: {
      type: STRING
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
