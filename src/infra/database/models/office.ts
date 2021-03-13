import { Model, INTEGER, STRING } from 'sequelize'
import { sequelize } from '@/infra/database/sequelize'
import { getForeignKeyOptions } from '@/infra/database/utilities'
import Plan from './plan'
import City from './city'
import State from './state'
import User from './user'

class OfficeSequelizeModel extends Model { }

OfficeSequelizeModel.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: STRING,
      allowNull: false,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    owner: {
      type: STRING
    },
    tradingName: {
      type: STRING,
    },
    image: {
      type: STRING,
    },
    imageName: {
      type: STRING,
    },
    cnpj: {
      type: STRING,
    },
    cpf: {
      type: STRING
    },
    cellphone: {
      type: STRING,
      allowNull: false,
    },
    planId: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    postcode: {
      type: STRING
    },
    address: {
      type: STRING
    },
    stateId: {
      type: INTEGER,
      allowNull: false,
    },
    cityId: {
      type: INTEGER,
      allowNull: false,
    },
    neighborhood: {
      type: STRING
    },
    addressNumber: {
      type: STRING
    }
  },
  {
    sequelize,
    name: {
      singular: 'office',
      plural: 'offices',
    },
    tableName: 'offices',
    indexes: [
      {
        fields: ['name', 'cnpj'],
        unique: true,
      },
    ],
  }
)

OfficeSequelizeModel.belongsTo(Plan, getForeignKeyOptions())
OfficeSequelizeModel.belongsTo(State, getForeignKeyOptions())
OfficeSequelizeModel.belongsTo(City, getForeignKeyOptions())

OfficeSequelizeModel.hasMany(User, getForeignKeyOptions('CASCADE'))
User.belongsTo(OfficeSequelizeModel, getForeignKeyOptions())

export const Office = OfficeSequelizeModel
export default OfficeSequelizeModel
