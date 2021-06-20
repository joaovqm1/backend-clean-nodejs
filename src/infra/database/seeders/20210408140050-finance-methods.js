'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('financemethods',
      [{
        id: 1,
        description: 'BOLETO',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 2,
        description: 'CARTÃO DE CRÉDITO',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 3,
        description: 'CARTÃO DE DÉBITO',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 4,
        description: 'CHEQUE',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 5,
        description: 'DEPÓSITO',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 6,
        description: 'DINHEIRO',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 7,
        description: 'TRANSFERÊNCIA',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 8,
        description: 'PIX',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {})
  },
  down: (queryInterface) => queryInterface.bulkDelete('financemethods', null, {}),
}
