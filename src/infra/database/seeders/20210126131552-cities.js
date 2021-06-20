'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const cities = await queryInterface.bulkInsert('cities',
      [{
        id: 1,
        name: 'SÃO SEBASTIÃO DO RIO PRETO',
        ibge: 3164803,
        stateId: 1
      }, {
        id: 2,
        name: 'BELO HORIZONTE',
        ibge: 3164802,
        stateId: 1
      }, {
        id: 3,
        name: 'SÃO PAULO',
        ibge: 40358789,
        stateId: 2
      }], {})

    return cities
  },
  down: (queryInterface) => queryInterface.bulkDelete('cities', null, {}),
}
