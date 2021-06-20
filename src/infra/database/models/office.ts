import { INTEGER, Model, STRING } from 'sequelize'

import { sequelize } from '@/infra/database/sequelize'
import { getForeignKeyOptions, idSchema } from '@/infra/database/utilities'

import { City } from './city'
import { CustomerSupplier } from './customersupplier'
import { Document } from './document'
import { Finance } from './finance'
import { FinanceMethod } from './financemethod'
import { FinanceType } from './financetype'
import { Phases } from './phases'
import { Plan } from './plan'
import { Project } from './project'
import { ProjectStatus } from './projectstatus'
import { ProjectType } from './projecttype'
import { Scope } from './scope'
import { State } from './state'
import { Task } from './task'
import { User } from './user'

class OfficeSequelizeModel extends Model { }

OfficeSequelizeModel.init(
  {
    id: idSchema,
    email: {
      type: STRING,
      allowNull: false,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    owner: {
      type: STRING
    },
    tradingName: {
      type: STRING,
    },
    image: {
      type: STRING,
    },
    imageName: {
      type: STRING,
    },
    cnpj: {
      type: STRING,
    },
    cpf: {
      type: STRING
    },
    cellphone: {
      type: STRING,
      allowNull: false,
    },
    planId: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    postcode: {
      type: STRING
    },
    address: {
      type: STRING
    },
    stateId: {
      type: INTEGER,
      allowNull: false,
    },
    cityId: {
      type: INTEGER,
      allowNull: false,
    },
    neighborhood: {
      type: STRING
    },
    addressNumber: {
      type: STRING
    }
  },
  {
    sequelize,
    name: {
      singular: 'office',
      plural: 'offices',
    },
    tableName: 'offices',
    indexes: [
      {
        fields: ['name', 'cnpj'],
        unique: true,
      },
    ],
  }
)

OfficeSequelizeModel.belongsTo(Plan, getForeignKeyOptions())
OfficeSequelizeModel.belongsTo(State, getForeignKeyOptions())
OfficeSequelizeModel.belongsTo(City, getForeignKeyOptions())

OfficeSequelizeModel.hasMany(User, getForeignKeyOptions('CASCADE'))
User.belongsTo(OfficeSequelizeModel, getForeignKeyOptions())

OfficeSequelizeModel.hasMany(Document, getForeignKeyOptions('CASCADE'))
OfficeSequelizeModel.hasMany(CustomerSupplier, getForeignKeyOptions('CASCADE'))
OfficeSequelizeModel.hasMany(Finance, getForeignKeyOptions('CASCADE'))
OfficeSequelizeModel.hasMany(FinanceMethod, getForeignKeyOptions('CASCADE'))
OfficeSequelizeModel.hasMany(FinanceType, getForeignKeyOptions('CASCADE'))
OfficeSequelizeModel.hasMany(Phases, getForeignKeyOptions('CASCADE'))
OfficeSequelizeModel.hasMany(Scope, getForeignKeyOptions('CASCADE'))
OfficeSequelizeModel.hasMany(ProjectStatus, getForeignKeyOptions('CASCADE'))
OfficeSequelizeModel.hasMany(ProjectType, getForeignKeyOptions('CASCADE'))
OfficeSequelizeModel.hasMany(Task, getForeignKeyOptions('CASCADE'))
OfficeSequelizeModel.hasMany(Project, getForeignKeyOptions('CASCADE'))


export const Office = OfficeSequelizeModel
export default OfficeSequelizeModel
