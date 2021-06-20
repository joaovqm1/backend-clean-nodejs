'use strict'

const { INTEGER, DATEONLY } = require('sequelize')
const { id, createrId, updaterId, createdAt, updatedAt, officeId, projectId } = require('../utilities/default-fields')

module.exports = {
  up: async (queryInterface) => {
    const table = await queryInterface.createTable('projectsphases', {
      id,
      projectId,
      phaseId: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'phases',
          key: 'id',
        },
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
      },
      dueDate: {
        type: DATEONLY
      },
      startDate: {
        type: DATEONLY,
        allowNull: false
      },
      finishDate: {
        type: DATEONLY
      },
      createrId,
      updaterId,
      createdAt,
      updatedAt,
      officeId
    }, {
      uniqueKeys: {
        unique_name: {
          customIndex: true,
          fields: ['phaseId', 'projectId'],
        }
      }
    })
    return table
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('projectsphases')
  }
}
