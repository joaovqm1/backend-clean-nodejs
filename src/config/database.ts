require('./env')

export const databaseConfig = {
  host: process.env.DATABASE_HOST || 'localhost',
  username: process.env.DATABASE_USER || 'joaovq',
  password: process.env.DATABASE_PASSWORD || '123456',
  logging: process.env.DATABASE_LOGS === 'true',
  dialect: process.env.DB_DIALECT || 'mysql',
  port: process.env.DATABASE_PORT || 3306,
  storage: './src/test/database.sqlite',
  database: process.env.DATABASE_NAME || 'dev',
  define: {
    underscored: true,
    underscoredAll: true,
  }
}
