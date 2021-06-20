'use strict'

const { UniqueConstraintError } = require('sequelize')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('banks',
      [{
        id: 1,
        name: '001 - BANCO DO BRASIL',
        number: '001'
      }, {
        id: 2,
        name: '002 - BANCO CENTRAL DO BRASIL',
        number: '002'
      }], {})
  },
  down: (queryInterface) => queryInterface.bulkDelete('banks', null, {}),
}
