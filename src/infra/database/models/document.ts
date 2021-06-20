import AWS from 'aws-sdk'
import { DOUBLE, INTEGER, Model, STRING } from 'sequelize'

import { storageConfig } from '@/config/index'
import { sequelize } from '@/infra/database/sequelize'
import {
  createrIdForeignKeyOptions,
  defaultFieldsSchema,
  idSchema,
  updaterIdForeignKeyOptions,
} from '@/infra/database/utilities'
import logger from '@/logger'

import { User } from './user'

class DocumentModel extends Model { }

DocumentModel.init(
  {
    id: idSchema,
    description: {
      type: STRING,
      allowNull: false
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    path: {
      type: STRING,
      allowNull: false
    },
    key: {
      type: STRING,
      allowNull: false
    },
    extension: {
      type: STRING,
      allowNull: false
    },
    mimeType: {
      type: STRING,
    },
    size: {
      type: DOUBLE,
    },
    ...defaultFieldsSchema,
  },
  {
    sequelize,
    tableName: 'documents',
    name: {
      singular: 'document',
      plural: 'documents',
    },
    indexes: [
      {
        fields: ['description', 'officeId'],
        unique: true
      },
      {
        fields: ['key', 'officeId'],
        unique: true
      },
    ],
  }
)

DocumentModel.belongsTo(User, createrIdForeignKeyOptions)
DocumentModel.belongsTo(User, updaterIdForeignKeyOptions)

DocumentModel.afterDestroy(async function(document: any) {
  try {
    const s3 = new AWS.S3()

    const params = {
      Bucket: storageConfig.awsS3BucketName,
      Key: document.dataValues.key
    }

    s3.deleteObject(params, function(_error, result) {
      return result
    })
  } catch (error) {
    logger.error(error)
  }
})


export const Document = DocumentModel
export default DocumentModel
