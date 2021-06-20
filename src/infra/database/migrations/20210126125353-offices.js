'use strict'

const { INTEGER, STRING, DATE } = require('sequelize')
const { id, stateId, cityId, createdAt, updatedAt, deletedAt } = require('../utilities/default-fields')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.createTable('offices', {
      id,
      email: {
        type: STRING,
        allowNull: false
      },
      name: {
        type: STRING,
        allowNull: false
      },
      owner: {
        type: STRING
      },
      tradingName: {
        type: STRING
      },
      image: {
        type: STRING
      },
      imageName: {
        type: STRING
      },
      cnpj: {
        type: STRING
      },
      cpf: {
        type: STRING
      },
      cellphone: {
        type: STRING,
        allowNull: false
      },
      planId: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'plans',
          key: 'id'
        }
      },
      postcode: {
        type: STRING
      },
      address: {
        type: STRING
      },
      stateId,
      cityId,
      neighborhood: {
        type: STRING
      },
      addressNumber: {
        type: STRING
      },
      createdAt,
      updatedAt,
      deletedAt
    }, {
      uniqueKeys: {
        unique_name_cnpj: {
          customIndex: true,
          fields: ['name', 'cnpj']
        }
      }
    })

    return table
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('offices')
  }
}
