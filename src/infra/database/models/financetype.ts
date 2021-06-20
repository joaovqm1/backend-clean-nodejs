import { ENUM, INTEGER, Model, STRING } from 'sequelize'

import { sequelize } from '@/infra/database/sequelize'
import {
  createrIdForeignKeyOptions,
  defaultFieldsSchema,
  idSchema,
  updaterIdForeignKeyOptions
} from '@/infra/database/utilities'

import User from './user'

class FinanceTypeSequelizeModel extends Model { }

FinanceTypeSequelizeModel.init({
  id: idSchema,
  description: {
    type: STRING,
    allowNull: false,
  },
  type: {
    type: ENUM,
    allowNull: false,
    values: ['DESPESA', 'RECEITA', 'AMBOS']
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
    singular: 'financeType',
    plural: 'financesTypes'
  },
  tableName: 'financetypes',
  indexes: [
    {
      fields: ['description', 'officeId'],
      unique: true
    }
  ]
})

FinanceTypeSequelizeModel.belongsTo(User, createrIdForeignKeyOptions)
FinanceTypeSequelizeModel.belongsTo(User, updaterIdForeignKeyOptions)

export const FinanceType = FinanceTypeSequelizeModel
export default FinanceTypeSequelizeModel