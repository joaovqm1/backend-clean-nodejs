'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('projectsstatus',
      [{
        id: 1,
        description: 'TRATATIVAS INICIAIS',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 2,
        description: 'ORÇAMENTO',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 3,
        description: 'PARADO',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 4,
        description: 'EM ANDAMENTO',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 5,
        description: 'OBRA',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 6,
        description: 'ACOMPANHAMENTO',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 7,
        description: 'AGUARDANDO APROVAÇÃO',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 8,
        description: 'AGUARDANDO LEVANTAMENTO TOPOGRÁFICO',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 9,
        description: 'CONCLUÍDO',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {})
  },
  down: (queryInterface) => queryInterface.bulkDelete('projectsstatus', null, {}),
}
