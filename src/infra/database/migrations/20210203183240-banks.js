'use strict'

const { INTEGER, STRING, DATE } = require('sequelize')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.createTable('banks', {
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
      number: {
        type: STRING,
        allowNull: false
      }
    }, {
      uniqueKeys: {
        unique: {
          customIndex: true,
          fields: ['name'],
        }
      }
    })
    return table
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('banks')
  }
}