'use strict'
const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('finances',
      [{
        description: 'RECEBIMENTO DA PRIMEIRA PARCELA DE UM TRABALHO AUTOCAD',
        type: 'RECEITA',
        status: 'ABERTA',
        dateToFinish: new Date().toISOString().split('T')[0],
        value: faker.datatype.number({ max: 1500 }),
        financeTypeId: 1,
        customerSupplierId: 1,
        financeMethodId: 1,
        createrId: 1,
        officeId: 1
      }, {
        description: 'DESLOCAMENTO PARA VISITAÇÃO',
        type: 'DESPESA',
        status: 'FINALIZADA',
        finishDate: new Date().toISOString().split('T')[0],
        value: faker.datatype.number({ max: 1500 }),
        financeTypeId: 2,
        customerSupplierId: 2,
        financeMethodId: 6,
        createrId: 1,
        officeId: 1
      }], {})
  },
  down: (queryInterface) => queryInterface.bulkDelete('finances', null, {}),
}
