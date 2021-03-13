const enviroment = (process.env.NODE_ENV || 'dev').toUpperCase()

export const enviromentConfig = {
  enviroment,
  isProductionEnviroment: (): boolean => {
    return enviroment === 'PRODUCTION'
  },
  isDevOrTestEnviroment: (): boolean => {
    return ['TEST', 'DEV'].includes(enviroment)
  }
}
