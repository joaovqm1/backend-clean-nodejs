'use strict'

const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users',
      [{
        id: 1,
        roleId: 1,
        username: 'clean-arch',
        cpf: '11111111111',
        email: 'maintest@test.com',
        officeId: 1,
        name: 'OFFICE OWNER',
        passwordHash: await bcrypt.hash('clean-arch', 8),
        createdAt: new Date(),
        updatedAt: new Date()
      }], {})
  },
  down: (queryInterface) => queryInterface.bulkDelete('users', null, {}),
}
