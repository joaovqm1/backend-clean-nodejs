'use strict'

const { UniqueConstraintError } = require('sequelize')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('phases',
      [{
        id: 1,
        description: 'LEVANTAMENTO',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 2,
        description: 'ANTEPROJETO',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 3,
        description: 'EXECUTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 4,
        description: 'DETALHAMENTO',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {})
  },
  down: (queryInterface) => queryInterface.bulkDelete('phases', null, {}),
}
