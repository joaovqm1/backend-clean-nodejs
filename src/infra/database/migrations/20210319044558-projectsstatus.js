'use strict'

const { STRING, INTEGER } = require('sequelize')
const { id, defaultFields } = require('../utilities/default-fields')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.createTable('projectsstatus', {
      id,
      description: {
        type: STRING,
        allowNull: false
      },
      ...defaultFields,
      officeId: {
        type: INTEGER
      },
      createrId: {
        type: INTEGER
      }
    }, {
      uniqueKeys: {
        unique: {
          customIndex: true,
          fields: ['description'],
        }
      }
    })

    return table
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('projectsstatus')
  }
}