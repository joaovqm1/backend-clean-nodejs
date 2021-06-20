import { INTEGER, Model, STRING } from 'sequelize'

import { sequelize } from '@/infra/database/sequelize'
import {
  createrIdForeignKeyOptions,
  defaultFieldsSchema,
  idSchema,
  updaterIdForeignKeyOptions
} from '@/infra/database/utilities'

import User from './user'

class ScopeModel extends Model { }

ScopeModel.init({
  id: idSchema,
  description: {
    type: STRING,
    allowNull: false,
    field: 'description'
  },
  ...defaultFieldsSchema,
  officeId: {
    type: INTEGER
  },
  createrId: {
    type: INTEGER
  }
}, {
  sequelize,
  paranoid: true,
  name: {
    singular: 'scope',
    plural: 'scopes'
  },
  tableName: 'scopes',
  indexes: [
    {
      fields: ['description', 'officeId'],
      unique: true
    },
  ]
})

ScopeModel.belongsTo(User, createrIdForeignKeyOptions)
ScopeModel.belongsTo(User, updaterIdForeignKeyOptions)

export const Scope = ScopeModel
export default ScopeModel