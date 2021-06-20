import { DATEONLY, DOUBLE, ENUM, INTEGER, Model, STRING } from 'sequelize'

import {
  createrIdForeignKeyOptions,
  defaultFieldsSchema,
  getForeignKeyOptions,
  updaterIdForeignKeyOptions
} from '@/infra/database/utilities'

import { sequelize } from '../sequelize'
import CustomerSupplier from './customersupplier'
import FinanceMethod from './financemethod'
import FinanceType from './financetype'
import User from './user'

class FinanceSequelizeModel extends Model { }

FinanceSequelizeModel.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  description: {
    type: STRING,
    allowNull: false,
  },
  officeId: {
    type: INTEGER,
    allowNull: false,
  },
  customerSupplierId: {
    type: INTEGER,
    allowNull: false,
  },
  type: {
    type: ENUM,
    allowNull: false,
    values: ['DESPESA', 'RECEITA']
  },
  status: {
    type: ENUM,
    allowNull: false,
    values: ['ABERTO', 'FINALIZADO']
  },
  finishDate: {
    type: DATEONLY,
  },
  dateToFinish: {
    type: DATEONLY,
  },
  value: {
    type: DOUBLE,
    allowNull: false
  },
  financeTypeId: {
    type: INTEGER,
    allowNull: false
  },
  financeMethodId: {
    type: INTEGER,
  },
  projectId: {
    type: INTEGER
  },
  ...defaultFieldsSchema,
}, {
  sequelize,
  paranoid: true,
  name: {
    singular: 'finance',
    plural: 'finances'
  },
  tableName: 'finances'
})

FinanceSequelizeModel.belongsTo(User, createrIdForeignKeyOptions)
FinanceSequelizeModel.belongsTo(User, updaterIdForeignKeyOptions)
FinanceSequelizeModel.belongsTo(CustomerSupplier, getForeignKeyOptions())
FinanceSequelizeModel.belongsTo(FinanceType, getForeignKeyOptions())
FinanceSequelizeModel.belongsTo(FinanceMethod, getForeignKeyOptions())

export const Finance = FinanceSequelizeModel
export default FinanceSequelizeModel
