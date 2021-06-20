'use strict'

const { INTEGER, STRING, DOUBLE, DATEONLY, ENUM } = require('sequelize')
const { id, defaultFields, projectId, customerSupplierId } = require('../utilities/default-fields')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.createTable('finances', {
      id,
      description: {
        type: STRING,
        allowNull: false,
      },
      customerSupplierId,
      type: {
        type: ENUM,
        allowNull: false,
        values: ['DESPESA', 'RECEITA']
      },
      status: {
        type: ENUM,
        allowNull: false,
        values: ['ABERTA', 'FINALIZADA']
      },
      finishDate: {
        type: DATEONLY,
      },
      dateToFinish: {
        type: DATEONLY,
      },
      value: {
        type: DOUBLE,
        allowNull: false
      },
      financeTypeId: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'financetypes',
          key: 'id'
        },
        onDelete: 'NO ACTION'
      },
      financeMethodId: {
        type: INTEGER,
        references: {
          model: 'financemethods',
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
    await queryInterface.dropTable('finances')
  }
}