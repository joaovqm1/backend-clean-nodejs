import { Model, STRING } from 'sequelize'

import { sequelize } from '@/infra/database/sequelize'

import { idSchema } from '../utilities'

class PlanModel extends Model { }

PlanModel.init(
  {
    id: idSchema,
    name: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    name: {
      singular: 'plan',
      plural: 'plans',
    },
    tableName: 'plans',
    indexes: [
      {
        fields: ['name'],
        unique: true,
      },
    ],
  }
)

export const Plan = PlanModel
export default PlanModel
