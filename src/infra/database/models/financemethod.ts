import { INTEGER, Model, STRING } from 'sequelize'

import { sequelize } from '@/infra/database/sequelize'
import {
  createrIdForeignKeyOptions,
  defaultFieldsSchema,
  idSchema,
  updaterIdForeignKeyOptions
} from '@/infra/database/utilities'

import User from './user'


class FinanceMethodSequelizeModel extends Model { }

FinanceMethodSequelizeModel.init({
  id: idSchema,
  description: {
    type: STRING,
    allowNull: false,
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
    singular: 'financeMethod',
    plural: 'financesMethods'
  },
  tableName: 'financemethods',
  indexes: [
    {
      fields: ['description', 'officeId'],
      unique: true
    },
  ]
})

FinanceMethodSequelizeModel.belongsTo(User, createrIdForeignKeyOptions)
FinanceMethodSequelizeModel.belongsTo(User, updaterIdForeignKeyOptions)

export const FinanceMethod = FinanceMethodSequelizeModel
export default FinanceMethodSequelizeModel