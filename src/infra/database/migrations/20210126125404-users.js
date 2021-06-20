'use strict'

const { INTEGER, STRING, BOOLEAN, DOUBLE, JSON, DATE } = require('sequelize')
const { id, officeId, createdAt, updatedAt, deletedAt, createrId, updaterId } = require('../utilities/default-fields')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.createTable('users', {
      id,
      username: {
        type: STRING,
        allowNull: false
      },
      officeId,
      email: {
        type: STRING,
        allowNull: false
      },
      image: {
        type: STRING
      },
      imageName: {
        type: STRING
      },
      name: {
        type: STRING,
        allowNull: false
      },
      passwordHash: {
        type: STRING,
        allowNull: false
      },
      emailVerified: {
        type: BOOLEAN,
        defaultValue: false
      },
      token: {
        type: STRING
      },
      birthdate: {
        type: STRING
      },
      cpf: {
        type: STRING
      },
      recoveryToken: {
        type: STRING
      },
      commissionPercentage: {
        type: DOUBLE
      },
      roleId: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id'
        },
        onDelete: 'NO ACTION'
      },
      createrId: {
        ...createrId,
        allowNull: true
      },
      updaterId: {
        ...updaterId,
        allowNull: true
      },
      createdAt,
      updatedAt,
      deletedAt
    }, {
      uniqueKeys: {
        unique_username: {
          customIndex: true,
          fields: ['username']
        },
        unique_email: {
          customIndex: true,
          fields: ['email']
        }
      }
    })

    return table
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users')
  }
}
