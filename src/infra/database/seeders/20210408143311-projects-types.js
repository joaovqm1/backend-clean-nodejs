'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('projectstypes',
      [{
        id: 1,
        description: 'RESIDENCIAL',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 2,
        description: 'PAISAGÍSTICO',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 3,
        description: 'REGULARIZAÇÃO',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 4,
        description: 'ARQUITETÔNICO',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {})
  },
  down: (queryInterface) => queryInterface.bulkDelete('projectstypes', null, {}),
}
