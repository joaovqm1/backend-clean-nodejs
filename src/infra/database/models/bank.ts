import { INTEGER, Model, STRING } from 'sequelize'

import { sequelize } from '@/infra/database/sequelize'

class BankSequelizeModel extends Model { }

BankSequelizeModel.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  number: {
    type: STRING,
    allowNull: false,
  }
}, {
  sequelize,
  tableName: 'banks',
  timestamps: false,
  name: {
    singular: 'bank',
    plural: 'banks'
  },
  indexes: [
    {
      fields: ['nome'],
      unique: true
    }
  ]
})


export const Bank = BankSequelizeModel
export default BankSequelizeModel
