import { Sequelize } from 'sequelize'

import { databaseConfig } from '@/config'

const url = `${databaseConfig.dialect}://${databaseConfig.username}:${databaseConfig.password}@${databaseConfig.host}:${databaseConfig.port}/${databaseConfig.database}`

const options = {
  logging: databaseConfig.logging,
  storage: databaseConfig.storage,
}

export const sequelize = new Sequelize(url, options)
