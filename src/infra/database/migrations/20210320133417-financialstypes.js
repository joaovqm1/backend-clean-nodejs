'use strict'

const { STRING, ENUM } = require('sequelize')
const { id, defaultFields, officeId, createrId } = require('../utilities/default-fields')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.createTable('financetypes', {
      id,
      description: {
        type: STRING,
        allowNull: false
      },
      type: {
        type: ENUM,
        allowNull: false,
        values: ['DESPESA', 'RECEITA', 'AMBOS']
      },
      ...defaultFields,
      officeId: {
        ...officeId,
        allowNull: true
      },
      createrId: {
        ...createrId,
        allowNull: true
      }
    }, {
      uniqueKeys: {
        unique: {
          customIndex: true,
          fields: ['description', 'officeId'],
        }
      }
    })

    return table
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('financetypes')
  }
}