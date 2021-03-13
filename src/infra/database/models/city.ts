import { getForeignKeyOptions } from '@/infra/database/utilities'
import { Model, INTEGER, STRING } from 'sequelize'
import { sequelize } from '@/infra/database/sequelize'

import State from './state'

class CityModel extends Model {}

CityModel.init(
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
    ibge: {
      type: INTEGER,
      allowNull: false,
    },
    stateId: {
      type: INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: 'cities',
    name: {
      singular: 'city',
      plural: 'cities',
    },
    indexes: [
      {
        fields: ['name', 'stateId'],
        unique: true,
      },
    ],
  }
)

CityModel.belongsTo(State, getForeignKeyOptions())

export const City = CityModel
export default CityModel
