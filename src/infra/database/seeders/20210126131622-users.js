'use strict'

const { UniqueConstraintError } = require('sequelize')
const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert('users',
        [{
          id: 1,
          roleId: 1,
          username: 'test',
          cpf: '11111111111',
          email: 'maintest@test.com',
          officeId: 1,
          name: 'OFFICE OWNER',
          passwordHash: await bcrypt.hash('test', 8),
          createdAt: new Date(),
          updatedAt: new Date()
        }], {})
    } catch (error) {
      if (!(error instanceof UniqueConstraintError)) {
        throw error
      }
    }
  },
  down: (queryInterface) => queryInterface.bulkDelete('users', null, {}),
}
