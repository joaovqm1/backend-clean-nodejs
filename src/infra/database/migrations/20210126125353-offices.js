'use strict'

const { INTEGER, STRING, JSON, DATE } = require('sequelize')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.createTable('offices', {
      id: {
        type: INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: STRING,
        allowNull: false
      },
      name: {
        type: STRING,
        allowNull: false
      },
      owner: {
        type: STRING
      },
      tradingName: {
        type: STRING
      },
      image: {
        type: STRING
      },
      imageName: {
        type: STRING
      },
      cnpj: {
        type: STRING
      },
      cpf: {
        type: STRING
      },
      cellphone: {
        type: STRING,
        allowNull: false
      },
      planId: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: "plans",
          key: "id"
        }
      },
      postcode: {
        type: STRING
      },
      address: {
        type: STRING
      },
      stateId: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: "plans",
          key: "id"
        }
      },
      cityId: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: "cities",
          key: "id"
        }
      },
      neighborhood: {
        type: STRING
      },
      addressNumber: {
        type: STRING
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
        unique_name_cnpj: {
          customIndex: true,
          fields: ["name", "cnpj"]
        }
      }
    })

    return table
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('offices')
  }
}
