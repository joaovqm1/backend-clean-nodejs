import { DATEONLY, INTEGER, Model } from 'sequelize'

import { sequelize } from '@/infra/database/sequelize'
import {
  createrIdForeignKeyOptions,
  getForeignKeyOptions,
  idSchema,
  updaterIdForeignKeyOptions
} from '@/infra/database/utilities'

import { defaultFieldsSchema } from '../utilities'
import { Document } from './document'
import { Phases } from './phases'
import { User } from './user'

class ProjectPhaseSequelizeModel extends Model { }

ProjectPhaseSequelizeModel.init({
  id: idSchema,
  projectId: {
    type: INTEGER,
    allowNull: false
  },
  phaseId: {
    type: INTEGER,
    allowNull: false
  },
  dueDate: {
    type: DATEONLY
  },
  startDate: {
    type: DATEONLY,
    allowNull: false
  },
  finishDate: {
    type: DATEONLY
  },
  ...defaultFieldsSchema,
}, {
  sequelize,
  name: {
    singular: 'projectPhase',
    plural: 'projectsPhases'
  },
  tableName: 'projectsphases',
  indexes: [
    {
      fields: ['phaseId', 'projectId'],
      unique: true
    },
  ]
})

ProjectPhaseSequelizeModel.belongsTo(User, createrIdForeignKeyOptions)
ProjectPhaseSequelizeModel.belongsTo(User, updaterIdForeignKeyOptions)
ProjectPhaseSequelizeModel.belongsTo(Phases, getForeignKeyOptions())
ProjectPhaseSequelizeModel.hasMany(Document, getForeignKeyOptions('CASCADE'))

export const ProjectPhase = ProjectPhaseSequelizeModel
export default ProjectPhaseSequelizeModel