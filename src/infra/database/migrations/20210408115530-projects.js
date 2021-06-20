'use strict'

const { INTEGER, DOUBLE, DATEONLY, STRING, JSON } = require('sequelize')
const { id, defaultFields, stateId, cityId, customerSupplierId } = require('../utilities/default-fields')

module.exports = {
  up: async (queryInterface) => {
    const table = await queryInterface.createTable('projects', {
      id,
      name: {
        type: STRING,
        allowNull: false
      },
      projectTypeId: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'projectstypes',
          key: 'id',
        },
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
      },
      projectStatusId: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'projectsstatus',
          key: 'id',
        },
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
      },
      customerId: customerSupplierId,
      technicalManagerId: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
      },
      startDate: {
        type: DATEONLY,
        allowNull: false
      },
      finishDate: {
        type: DATEONLY
      },
      dueDate: {
        type: DATEONLY
      },
      totalArea: {
        type: DOUBLE
      },
      postcode: {
        type: STRING
      },
      address: {
        type: STRING
      },
      stateId: {
        ...stateId,
        allowNull: true
      },
      cityId: {
        ...cityId,
        allowNull: true
      },
      neighborhood: {
        type: STRING
      },
      addressComplement: {
        type: STRING
      },
      addressReference: {
        type: STRING
      },
      addressNumber: {
        type: STRING
      },
      annotation: {
        type: STRING
      },
      payment: {
        type: JSON
      },
      ...defaultFields
    }, {
      uniqueKeys: {
        unique_name: {
          customIndex: true,
          fields: ['name', 'officeId'],
        }
      }
    })

    return table
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('projects')
  }
}
