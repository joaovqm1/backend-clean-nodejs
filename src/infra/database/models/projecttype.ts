import { Model, STRING } from 'sequelize'

import { sequelize } from '@/infra/database/sequelize'
import {
  createrIdForeignKeyOptions,
  idSchema,
  updaterIdForeignKeyOptions
} from '@/infra/database/utilities'

import { defaultFieldsSchema } from '../utilities'
import User from './user'

class ProjectTypeSequelizeModel extends Model { }

ProjectTypeSequelizeModel.init({
  id: idSchema,
  description: {
    type: STRING,
    allowNull: false,
  },
  ...defaultFieldsSchema,
}, {
  sequelize,
  paranoid: true,
  name: {
    singular: 'projectType',
    plural: 'projectsTypes'
  },
  tableName: 'projectstypes',
  indexes: [
    {
      fields: ['description', 'officeId'],
      unique: true
    }
  ]
})

ProjectTypeSequelizeModel.belongsTo(User, createrIdForeignKeyOptions)
ProjectTypeSequelizeModel.belongsTo(User, updaterIdForeignKeyOptions)

export const ProjectType = ProjectTypeSequelizeModel
export default ProjectTypeSequelizeModel