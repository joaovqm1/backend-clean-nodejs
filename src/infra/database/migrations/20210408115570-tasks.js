'use strict'

const { INTEGER, STRING, TIME, DATEONLY, ENUM } = require('sequelize')
const { id, defaultFields, projectId } = require('../utilities/default-fields')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.createTable('tasks', {
      id,
      title: {
        type: STRING,
        allowNull: false,
      },
      description: {
        type: STRING,
      },
      status: {
        type: ENUM,
        allowNull: false,
        values: ['ABERTA', 'FINALIZADA']
      },
      startDate: {
        type: DATEONLY,
        allowNull: false
      },
      finishDate: {
        type: DATEONLY,
      },
      startTime: {
        type: TIME,
      },
      finishTime: {
        type: TIME,
      },
      responsibleId: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'NO ACTION'
      },
      projectId,
      ...defaultFields
    })

    return table
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tasks')
  }
}