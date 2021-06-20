'use strict'
const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('tasks',
      [{
        title: 'VISITAR OBRA DO SEU JOÃO',
        status: 'ABERTA',
        startDate: new Date().toISOString().split('T')[0],
        createrId: 1,
        responsibleId: 1,
        officeId: 1
      }, {
        title: 'CRIAR AUTOCAD PARA PROJETO DA COZINHA',
        status: 'FINALIZADA',
        startDate: new Date().toISOString().split('T')[0],
        finishDate: new Date().toISOString().split('T')[0],
        createrId: 1,
        responsibleId: 1,
        officeId: 1
      }], {})
  },
  down: (queryInterface) => queryInterface.bulkDelete('tasks', null, {}),
}
