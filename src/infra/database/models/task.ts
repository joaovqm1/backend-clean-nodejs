import { DATEONLY, ENUM, INTEGER, Model, STRING, TIME } from 'sequelize'

import { sequelize } from '@/infra/database/sequelize'
import {
  createrIdForeignKeyOptions,
  defaultFieldsSchema,
  idSchema,
  updaterIdForeignKeyOptions
} from '@/infra/database/utilities'

import User from './user'

class TaskSequelizeModel extends Model { }
TaskSequelizeModel.init({
  id: idSchema,
  title: {
    type: STRING,
    allowNull: false,
  },
  description: {
    type: STRING
  },
  status: {
    type: ENUM,
    allowNull: false,
    values: ['ABERTA', 'FINALIZADA'],
    defaultValue: 0
  },
  startDate: {
    type: DATEONLY,
    allowNull: false
  },
  finishDate: {
    type: DATEONLY,
  },
  startTime: {
    type: TIME,
  },
  finishTime: {
    type: TIME,
  },
  responsibleId: {
    type: INTEGER,
    allowNull: false
  },
  ...defaultFieldsSchema
}, {
  sequelize,
  paranoid: true,
  name: {
    singular: 'task',
    plural: 'tasks'
  },
  tableName: 'tasks'
})

TaskSequelizeModel.belongsTo(User, createrIdForeignKeyOptions)
TaskSequelizeModel.belongsTo(User, updaterIdForeignKeyOptions)
TaskSequelizeModel.belongsTo(User, {
  as: 'responsible',
  foreignKey: 'responsibleId',
  onUpdate: 'CASCADE',
  onDelete: 'NO ACTION',
  hooks: true,
})

export const Task = TaskSequelizeModel
export default TaskSequelizeModel