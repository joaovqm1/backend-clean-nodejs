import { sequelize } from '@/infra/database/sequelize'
import { Model, INTEGER, STRING, BOOLEAN } from 'sequelize'

class RoleModel extends Model {}

RoleModel.init(
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
    timestamps: false,
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
