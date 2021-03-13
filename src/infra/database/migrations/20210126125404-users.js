'use strict'

const { INTEGER, STRING, BOOLEAN, DOUBLE, JSON, DATE } = require('sequelize')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.createTable('users', {
      id: {
        type: INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: STRING,
        allowNull: false
      },
      officeId: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: "offices",
          key: "id"
        },
        onDelete: 'CASCADE'
      },
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
        type: STRING,
        allowNull: false
      },
      recoveryToken: {
        type: STRING
      },
      commissionPercentage: {
        type: DOUBLE
      },
      roleId: {
        type: INTEGER,
        allowNull: false
      },
      createrId: {
        type: INTEGER,
        allowNull: true
      },
      updaterId: {
        type: INTEGER,
        allowNull: true
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
          fields: ["username"]
        },
        unique_email: {
          customIndex: true,
          fields: ["email"]
        }
      }
    })

    return table
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users')
  }
}
