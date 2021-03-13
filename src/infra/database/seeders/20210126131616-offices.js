'use strict'

const { UniqueConstraintError } = require('sequelize')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert('offices',
        [{
          id: 1,
          email: 'joaovq@gmail.com',
          name: 'MEU ESCRITÓRIO',
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
    } catch (error) {
      if (!(error instanceof UniqueConstraintError)) {
        throw error
      }
    }
  },
  down: (queryInterface) => queryInterface.bulkDelete('offices', null, {}),
}
