'use strict'

const { STRING } = require('sequelize')
const { id, defaultFields, createrId, officeId } = require('../utilities/default-fields')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.createTable('financemethods', {
      id,
      description: {
        type: STRING,
        allowNull: false
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
    await queryInterface.dropTable('financemethods')
  }
}