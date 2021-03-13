'use strict';

const { UniqueConstraintError } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert('states',
        [{
          id: 1,
          name: 'MINAS GERAIS',
          initials: 'MG'
        }, {
          id: 2,
          name: 'SÃO PAULO',
          initials: 'SP'
        }], {})
    } catch (error) { 
      if (!(error instanceof UniqueConstraintError)) {
        throw error
      }
    }
  },

  down: (queryInterface) => queryInterface.bulkDelete('states', null, {}),
};
