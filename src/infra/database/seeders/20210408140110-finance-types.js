'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('financetypes',
      [{
        id: 1,
        description: 'RECEITA DE PROJETO',
        type: 'RECEITA',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 2,
        description: 'DESLOCAMENTO PARA VISITAÇÃO',
        type: 'DESPESA',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 3,
        description: 'RECEITA E DESPESA',
        type: 'AMBOS',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {})
  },
  down: (queryInterface) => queryInterface.bulkDelete('financetypes', null, {}),
}
