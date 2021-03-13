import { sequelize } from '@/infra/database/sequelize'
import { Model, INTEGER, STRING } from 'sequelize'

class StateModel extends Model {}

StateModel.init(
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
    initials: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    name: {
      singular: 'state',
      plural: 'states',
    },
    tableName: 'states',
    indexes: [
      {
        fields: ['name'],
        unique: true,
      },
    ],
  }
)

export const State = StateModel
export default StateModel
