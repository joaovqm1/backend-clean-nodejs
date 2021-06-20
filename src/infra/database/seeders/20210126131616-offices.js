'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('offices',
      [{
        id: 1,
        email: 'joaovq@gmail.com',
        name: 'CLEAN ARCH',
        owner: 'JOÃO VITOR',
        cnpj: '111111111111',
        cpf: '111111111111',
        cellphone: '31999999999',
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
