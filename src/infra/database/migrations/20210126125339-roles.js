'use strict'

const { INTEGER, STRING, BOOLEAN } = require('sequelize')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.createTable('roles', {
      id: {
        type: INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: STRING,
        allowNull: false
      },
      alias: {
        type: STRING,
        allowNull: false
      },
      visible: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      description: {
        type: STRING
      }
    }, {
      uniqueKeys: {
        unique_name: {
          customIndex: true,
          fields: ["name"]
        }
      }
    })

    return table
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('roles')
  }
}
