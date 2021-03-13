'use strict'

const { INTEGER, STRING } = require('sequelize')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.createTable('cities', {
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
      ibge: {
        type: INTEGER,
        allowNull: false
      },
      stateId: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: "states",
          key: "id"
        }
      }
    }, {
      uniqueKeys: {
        unique_name: {
          customIndex: true,
          fields: ["name", "stateId"]
        }
      }
    })

    return table
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cities')
  }
}
