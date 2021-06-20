'use strict'

const { UniqueConstraintError } = require('sequelize')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('scopes',
      [{
        id: 1,
        description: 'SALA',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 2,
        description: 'QUARTO',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 3,
        description: 'ESCRITÓRIO',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 4,
        description: 'SALA DE JANTAR',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 5,
        description: 'ÁREA DE CHURRASCO',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 6,
        description: 'BANHEIRO',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {})
  },
  down: (queryInterface) => queryInterface.bulkDelete('scopes', null, {}),
}
