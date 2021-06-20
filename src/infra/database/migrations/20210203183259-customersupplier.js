'use strict'

const { INTEGER, STRING, DATE, DATEONLY, ENUM } = require('sequelize')
const { id, stateId, cityId, defaultFields } = require('../utilities/default-fields')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.createTable('customerssuppliers',
      {
        id,
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
          ...stateId,
          allowNull: true
        },
        cityId: {
          ...cityId,
          allowNull: true
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
          references: {
            model: 'banks',
            key: 'id'
          }
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
        ...defaultFields
      }, {
      uniqueKeys: {
        unique_name_cnpj: {
          customIndex: true,
          fields: ['name', 'cpfCnpj', 'officeId']
        }
      }
    })

    return table
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('customerssuppliers')
  }
}
