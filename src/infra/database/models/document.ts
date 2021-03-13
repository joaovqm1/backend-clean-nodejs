import { Model, INTEGER, STRING, DATEONLY } from 'sequelize'

import {
  sequelize,
  User,
  createrIdForeignKeyOptions,
  updaterIdForeignKeyOptions,
  defaultFieldsSchema,
} from '@/infra'

class DocumentModel extends Model { }

DocumentModel.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    status: {
      type: STRING,
      allowNull: false,
    },
    description: {
      type: STRING,
    },
    dueDate: {
      type: DATEONLY,
    },
    ...defaultFieldsSchema,
  },
  {
    sequelize,
    tableName: 'documents',
    paranoid: true,
    name: {
      singular: 'document',
      plural: 'documents',
    },
    indexes: [
      {
        fields: ['name', 'officeId'],
        unique: true
      },
    ],
  }
)

DocumentModel.belongsTo(User, createrIdForeignKeyOptions)
DocumentModel.belongsTo(User, updaterIdForeignKeyOptions)

export const Document = DocumentModel
export default DocumentModel
