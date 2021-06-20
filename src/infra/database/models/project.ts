import { DATEONLY, DOUBLE, INTEGER, JSON, Model, STRING } from 'sequelize'

import { sequelize } from '@/infra/database/sequelize'
import {
  createrIdForeignKeyOptions,
  getForeignKeyOptions,
  idSchema,
  updaterIdForeignKeyOptions
} from '@/infra/database/utilities'

import { defaultFieldsSchema } from '../utilities'
import { City } from './city'
import { CustomerSupplier } from './customersupplier'
import { Document } from './document'
import { Finance } from './finance'
import { ProjectPhase } from './projectphase'
import { ProjectScope } from './projectscope'
import { ProjectStatus } from './projectstatus'
import { ProjectType } from './projecttype'
import { State } from './state'
import { Task } from './task'
import { User } from './user'

class ProjectSequelizeModel extends Model { }

ProjectSequelizeModel.init({
  id: idSchema,
  name: {
    type: STRING,
    allowNull: false
  },
  projectTypeId: {
    type: INTEGER,
    allowNull: false
  },
  projectStatusId: {
    type: INTEGER,
    allowNull: false
  },
  customerId: {
    type: INTEGER,
    allowNull: false
  },
  technicalManagerId: {
    type: INTEGER,
    allowNull: false
  },
  startDate: {
    type: DATEONLY,
    allowNull: false
  },
  finishDate: {
    type: DATEONLY
  },
  dueDate: {
    type: DATEONLY
  },
  totalArea: {
    type: DOUBLE
  },
  postcode: {
    type: STRING
  },
  address: {
    type: STRING
  },
  stateId: {
    type: INTEGER
  },
  cityId: {
    type: INTEGER
  },
  neighborhood: {
    type: STRING
  },
  addressComplement: {
    type: STRING
  },
  addressReference: {
    type: STRING
  },
  addressNumber: {
    type: STRING
  },
  annotation: {
    type: STRING
  },
  payment: {
    type: JSON
  },
  ...defaultFieldsSchema,
}, {
  sequelize,
  paranoid: true,
  name: {
    singular: 'project',
    plural: 'projects'
  },
  tableName: 'projects',
  indexes: [
    {
      fields: ['name', 'officeId'],
      unique: true
    },
  ]
})

ProjectSequelizeModel.belongsTo(User, createrIdForeignKeyOptions)
ProjectSequelizeModel.belongsTo(User, updaterIdForeignKeyOptions)
ProjectSequelizeModel.belongsTo(State, getForeignKeyOptions())
ProjectSequelizeModel.belongsTo(City, getForeignKeyOptions())
ProjectSequelizeModel.belongsTo(CustomerSupplier, {
  ...getForeignKeyOptions(),
  as: 'customer',
  foreignKey: 'customerId'
})
ProjectSequelizeModel.belongsTo(User, {
  ...getForeignKeyOptions(),
  as: 'technicalManager',
  foreignKey: 'technicalManagerId'
})

ProjectSequelizeModel.belongsTo(ProjectType, getForeignKeyOptions())
ProjectSequelizeModel.belongsTo(ProjectStatus, getForeignKeyOptions())
ProjectSequelizeModel.hasMany(ProjectScope, {
  ...getForeignKeyOptions('CASCADE'),
  as: 'projectScopes'
})
ProjectSequelizeModel.hasMany(ProjectPhase, {
  ...getForeignKeyOptions('CASCADE'),
  as: 'projectPhases'
})
ProjectSequelizeModel.hasMany(Task, getForeignKeyOptions('CASCADE'))
ProjectSequelizeModel.hasMany(Document, getForeignKeyOptions('CASCADE'))
ProjectSequelizeModel.hasMany(Finance, getForeignKeyOptions('CASCADE'))

export const Project = ProjectSequelizeModel
export default ProjectSequelizeModel