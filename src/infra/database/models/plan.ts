import { sequelize } from '@/infra/database/sequelize'
import { Model, INTEGER, STRING } from 'sequelize'

class PlanModel extends Model {}

PlanModel.init(
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
