'use strict';

const { UniqueConstraintError } = require('sequelize')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const plans = await queryInterface.bulkInsert('plans',
        [{
          id: 1,
          name: 'TRIAL'
        }, {
          id: 2,
          name: 'SILVER'
        }, {
          id: 3,
          name: 'GOLD'
        },], {})

      return plans
    } catch (error) {
      if (!(error instanceof UniqueConstraintError)) {
        throw error
      }
    }
  },
  down: (queryInterface) => queryInterface.bulkDelete('plans', null, {}),
};
