'use strict'

const { INTEGER, STRING } = require('sequelize')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.createTable('plans', {
      id: {
        type: INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: STRING,
        allowNull: false
      }
    }, {
      uniqueKeys: {
        unique_name: {
          customIndex: true,
          fields: ['name']
        }
      }
    })

    return table
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('plans')
  }
}
