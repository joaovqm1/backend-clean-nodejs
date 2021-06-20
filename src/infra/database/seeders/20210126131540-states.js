'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('states',
      [{
        id: 1,
        name: 'MINAS GERAIS',
        initials: 'MG'
      }, {
        id: 2,
        name: 'SÃO PAULO',
        initials: 'SP'
      }], {})
  },

  down: (queryInterface) => queryInterface.bulkDelete('states', null, {}),
}
