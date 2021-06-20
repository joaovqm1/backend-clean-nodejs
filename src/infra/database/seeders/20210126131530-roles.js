'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('roles',
      [{
        id: 1,
        name: 'ADMIN',
        alias: 'ADMIN',
        visible: false
      }, {
        id: 2,
        name: 'ARCHITECT',
        alias: 'ARQUITETO(A)',
        visible: true
      }], {})
  },

  down: (queryInterface) => queryInterface.bulkDelete('roles', null, {}),
}
