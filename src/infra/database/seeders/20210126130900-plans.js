'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const plans = await queryInterface.bulkInsert('plans',
        [{
          id: 1,
          name: 'TRIAL'
        }, {
          id: 2,
          name: 'PAID'
        }], {})

      return plans
    } catch (error) {
      console.log(error)
    }
  },
  down: (queryInterface) => queryInterface.bulkDelete('plans', null, {}),
}
