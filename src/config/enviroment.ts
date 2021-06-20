require('./loader')

const enviroment = (process.env.NODE_ENV || 'dev').toUpperCase()

export const enviromentConfig = {
  enviroment,
  /* istanbul ignore next */
  isProductionEnvironment: (): boolean => {
    return enviroment === 'PRODUCTION'
  },
  isDevOrTestEnviroment: (): boolean => {
    return ['TEST', 'DEV'].includes(enviroment)
  }
}
