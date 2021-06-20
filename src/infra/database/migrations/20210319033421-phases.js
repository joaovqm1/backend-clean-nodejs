'use strict'

const { STRING } = require('sequelize')
const { id, officeId, createrId, defaultFields } = require('../utilities/default-fields')

module.exports = {
  up: async (queryInterface) => {
    const table = await queryInterface.createTable('phases', {
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
  down: async (queryInterface) => {
    await queryInterface.dropTable('phases')
  }
}