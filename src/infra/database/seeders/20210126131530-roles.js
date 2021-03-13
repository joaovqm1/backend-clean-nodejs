'use strict';

const { UniqueConstraintError } = require('sequelize')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert('roles',
        [{
          id: 1,
          name: 'OWNER',
          alias: 'PROPRIETÁRIO',
          visible: true
        }, {
          id: 2,
          name: 'ADMINISTRATIVEMANAGER',
          alias: 'GERENTE ADMINISTRATIVO',
          visible: true
        }, {
          id: 3,
          name: 'FINANCIALMANAGER',
          alias: 'GERENTE FINANCEIRO',
          visible: true
        }, {
          id: 4,
          name: 'PRODUCATIONMANAGER',
          alias: 'GERENTE DE PRODUÇÃO',
          visible: true
        }, {
          id: 5,
          name: 'INVENTORYMANAGER',
          alias: 'GERENTE DE ESTOQUE',
          visible: true
        }, {
          id: 6,
          name: 'PRODUCTIONWORKER',
          alias: 'COLETOR',
          visible: true
        }, {
          id: 7,
          name: 'MASTERBLENDER',
          alias: 'MASTER BLENDER',
          visible: true
        }, {
          id: 8,
          name: 'COUNTER',
          alias: 'CONTADOR',
          visible: true
        }, {
          id: 9,
          name: 'SALESMAN',
          alias: 'VENDEDOR',
          visible: true
        }, {
          id: 10,
          name: 'TECHNICALMANAGER',
          alias: 'RESPONSÁVEL TÉCNICO',
          visible: true
        }, {
          id: 11,
          name: 'ADMIN',
          alias: 'ADMIN',
          visible: false
        }], {})
    } catch (error) { 
      if (!(error instanceof UniqueConstraintError)) {
        throw error
      }
    }
  },

  down: (queryInterface) => queryInterface.bulkDelete('roles', null, {}),
};
