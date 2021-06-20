'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('offices',
      [{
        id: 1,
        email: 'joaovq@gmail.com',
        name: 'PROJETEI',
        owner: 'JOÃO VITOR',
        cnpj: '25032556000190',
        cpf: '11069620602',
        cellphone: '31982388860',
        planId: 1,
        stateId: 1,
        cityId: 1,
        postcode: '35815000',
        address: 'RUA TESTE',
        neighborhood: 'TESTE',
        addressNumber: '1A',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {})
  },
  down: (queryInterface) => queryInterface.bulkDelete('offices', null, {}),
}
