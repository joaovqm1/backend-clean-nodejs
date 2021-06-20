'use strict'

const { INTEGER, STRING, DOUBLE } = require('sequelize')
const { id, defaultFields, projectId } = require('../utilities/default-fields')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.createTable('documents', {
      id,
      description: {
        type: STRING,
        allowNull: false
      },
      name: {
        type: STRING,
        allowNull: false,
      },
      path: {
        type: STRING,
        allowNull: false
      },
      key: {
        type: STRING,
        allowNull: false
      },
      extension: {
        type: STRING,
        allowNull: false
      },
      mimeType: {
        type: STRING,
      },
      size: {
        type: DOUBLE,
      },
      projectId,
      projectScopeId: {
        type: INTEGER,
        references: {
          model: 'projectsscopes',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      projectPhaseId: {
        type: INTEGER,
        references: {
          model: 'projectsphases',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      ...defaultFields
    }, {
      uniqueKeys: {
        unique_description: {
          customIndex: true,
          fields: ['description', 'officeId']
        },
        unique_key: {
          customIndex: true,
          fields: ['key', 'officeId']
        }
      }
    })

    return table
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('documents')
  }
}
