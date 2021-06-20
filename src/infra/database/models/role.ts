import { BOOLEAN, Model, STRING } from 'sequelize'

import { sequelize } from '@/infra/database/sequelize'

import { idSchema } from '../utilities'

class RoleModel extends Model { }

RoleModel.init(
  {
    id: idSchema,
    name: {
      type: STRING,
      allowNull: false,
    },
    alias: {
      type: STRING,
      allowNull: false,
    },
    visible: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    description: {
      type: STRING,
    },
  },
  {
    sequelize,
    tableName: 'roles',
    name: {
      singular: 'role',
      plural: 'roles',
    },
    indexes: [
      {
        fields: ['name'],
        unique: true,
      },
    ],
  }
)

export const Role = RoleModel
export default RoleModel
