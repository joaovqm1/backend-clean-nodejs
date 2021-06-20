import { Model, STRING } from 'sequelize'

import { sequelize } from '@/infra/database/sequelize'
import {
  createrIdForeignKeyOptions,
  idSchema,
  updaterIdForeignKeyOptions
} from '@/infra/database/utilities'

import { defaultFieldsSchema } from '../utilities'
import User from './user'

class ProjectStatusSequelizeModel extends Model { }

ProjectStatusSequelizeModel.init({
  id: idSchema,
  description: {
    type: STRING,
    allowNull: false,
  },
  ...defaultFieldsSchema,
}, {
  sequelize,
  name: {
    singular: 'projectStatus',
    plural: 'projectsStatus'
  },
  tableName: 'projectsstatus',
  indexes: [
    {
      fields: ['description', 'officeId'],
      unique: true
    },
  ]
})

ProjectStatusSequelizeModel.belongsTo(User, createrIdForeignKeyOptions)
ProjectStatusSequelizeModel.belongsTo(User, updaterIdForeignKeyOptions)

export const ProjectStatus = ProjectStatusSequelizeModel
export default ProjectStatusSequelizeModel