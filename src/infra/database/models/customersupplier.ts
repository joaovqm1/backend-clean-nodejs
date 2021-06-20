import { DATEONLY, ENUM, INTEGER, Model, STRING } from 'sequelize'

import { sequelize } from '@/infra/database/sequelize'
import {
  defaultFieldsSchema,
  getForeignKeyOptions,
  idSchema,
} from '@/infra/database/utilities'

import Bank from './bank'
import City from './city'
import State from './state'

class CustomerSupplierSequelizeModel extends Model { }

CustomerSupplierSequelizeModel.init(
  {
    id: idSchema,
    name: {
      type: STRING,
      allowNull: false,
    },
    tradingName: {
      type: STRING,
    },
    email: {
      type: STRING
    },
    profile: {
      type: ENUM,
      values: ['CLIENTE/FORNECEDOR', 'CONTATO'],
      defaultValue: 'CLIENTE/FORNECEDOR'
    },
    type: {
      type: ENUM,
      allowNull: false,
      values: ['FÍSICO', 'JURÍDICO'],
      defaultValue: 'FÍSICO'
    },
    class: {
      type: ENUM,
      allowNull: false,
      values: ['CLIENTE', 'FORNECEDOR', 'AMBOS']
    },
    officeId: {
      type: INTEGER,
      allowNull: false,
    },
    cellphone1: {
      type: STRING,
    },
    cellphone2: {
      type: STRING,
    },
    phone1: {
      type: STRING,
    },
    phone2: {
      type: STRING,
    },
    website: {
      type: STRING,
    },
    birthdate: {
      type: DATEONLY,
    },
    cpfCnpj: {
      type: STRING,
    },
    identityCard: {
      type: STRING,
    },
    postcode: {
      type: STRING
    },
    address1: {
      type: STRING,
    },
    address2: {
      type: STRING
    },
    addressReference: {
      type: STRING,
    },
    stateId: {
      type: INTEGER,
    },
    cityId: {
      type: INTEGER,
    },
    neighborhood: {
      type: STRING,
    },
    addressComplement: {
      type: STRING,
    },
    addressNumber: {
      type: STRING,
    },
    bankId: {
      type: INTEGER,
    },
    bankBranch: {
      type: STRING,
    },
    bankAccount: {
      type: STRING,
    },
    bankAccountType: {
      type: ENUM,
      values: ['CORRENTE', 'POUPANÇA']
    },
    ...defaultFieldsSchema
  },
  {
    sequelize,
    name: {
      singular: 'customerSupplier',
      plural: 'customersSuppliers',
    },
    paranoid: true,
    tableName: 'customerssuppliers',
    indexes: [
      {
        fields: ['name', 'officeId'],
        unique: true,
      },
    ],
  }
)

CustomerSupplierSequelizeModel.belongsTo(State, getForeignKeyOptions())
CustomerSupplierSequelizeModel.belongsTo(City, getForeignKeyOptions())
CustomerSupplierSequelizeModel.belongsTo(Bank, {
  as: 'bank',
  foreignKey: 'bankId',
  onUpdate: 'CASCADE',
  onDelete: 'NO ACTION',
  hooks: true,
})

export const CustomerSupplier = CustomerSupplierSequelizeModel
export default CustomerSupplierSequelizeModel
