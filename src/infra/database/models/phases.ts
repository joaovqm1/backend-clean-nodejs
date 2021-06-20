import { INTEGER, Model, STRING } from 'sequelize'

import { sequelize } from '@/infra/database/sequelize'
import {
  createrIdForeignKeyOptions,
  idSchema,
  updaterIdForeignKeyOptions
} from '@/infra/database/utilities'

import { defaultFieldsSchema } from '../utilities'
import User from './user'

class PhasesSequelizeModel extends Model { }

PhasesSequelizeModel.init({
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
    singular: 'phase',
    plural: 'phases'
  },
  tableName: 'phases',
  indexes: [
    {
      fields: ['description', 'officeId'],
      unique: true
    },
  ]
})

PhasesSequelizeModel.belongsTo(User, createrIdForeignKeyOptions)
PhasesSequelizeModel.belongsTo(User, updaterIdForeignKeyOptions)

export const Phases = PhasesSequelizeModel
export default PhasesSequelizeModel