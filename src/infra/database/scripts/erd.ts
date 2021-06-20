import { writeFileSync } from 'fs'
import sequelizeErd from 'sequelize-erd'

import { sequelize } from '../sequelize'

async function main(): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('../models/office')

  const svg = await sequelizeErd({ source: sequelize })
  writeFileSync('./docs/erd-diagram.svg', svg)
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main()
