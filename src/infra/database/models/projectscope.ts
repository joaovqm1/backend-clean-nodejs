import { INTEGER, Model } from 'sequelize'

import { sequelize } from '@/infra/database/sequelize'
import {
  createrIdForeignKeyOptions,
  getForeignKeyOptions,
  idSchema,
  updaterIdForeignKeyOptions
} from '@/infra/database/utilities'

import { defaultFieldsSchema } from '../utilities'
import { Document } from './document'
import { Scope } from './scope'
import { User } from './user'

class ProjectScopeSequelizeModel extends Model { }

ProjectScopeSequelizeModel.init({
  id: idSchema,
  projectId: {
    type: INTEGER,
    allowNull: false
  },
  scopeId: {
    type: INTEGER,
    allowNull: false
  },
  ...defaultFieldsSchema,
}, {
  sequelize,
  name: {
    singular: 'projectScope',
    plural: 'projectsScopes'
  },
  tableName: 'projectsscopes',
  indexes: [
    {
      fields: ['scopeId', 'projectId'],
      unique: true
    },
  ]
})

ProjectScopeSequelizeModel.belongsTo(User, createrIdForeignKeyOptions)
ProjectScopeSequelizeModel.belongsTo(User, updaterIdForeignKeyOptions)
ProjectScopeSequelizeModel.belongsTo(Scope, getForeignKeyOptions())
ProjectScopeSequelizeModel.hasMany(Document, getForeignKeyOptions('CASCADE'))

export const ProjectScope = ProjectScopeSequelizeModel
export default ProjectScopeSequelizeModel