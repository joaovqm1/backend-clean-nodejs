'use strict'

const { INTEGER } = require('sequelize')
const { id, createrId, updaterId, createdAt, updatedAt, officeId, projectId } = require('../utilities/default-fields')

module.exports = {
  up: async (queryInterface) => {
    const table = await queryInterface.createTable('projectsscopes', {
      id,
      projectId,
      scopeId: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'scopes',
          key: 'id',
        },
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
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
          fields: ['scopeId', 'projectId'],
        }
      }
    })

    return table
  },
  down: async (queryInterface, sequelize) => {
    await queryInterface.dropTable('projectsscopes')
  }
}
