'use strict'

const { INTEGER, STRING, DATE, DATEONLY } = require('sequelize')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.createTable('documents', {
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
      status: {
        type: STRING,
        allowNull: false
      },
      description: {
        type: STRING
      },
      dueDate: {
        type: DATEONLY
      },
      officeId: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'offices',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createrId: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE'
      },
      updaterId: {
        type: INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        type: DATE,
        allowNull: true
      },
      updatedAt: {
        type: DATE,
        allowNull: true
      },
      deletedAt: {
        type: DATE
      }
    }, {
      uniqueKeys: {
        unique_username: {
          customIndex: true,
          fields: ['name', 'officeId']
        }
      }
    })

    return table
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('documents')
  }
}
