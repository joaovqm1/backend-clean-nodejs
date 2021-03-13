import signale from 'signale'

import { enviromentConfig } from '@/config'

export default {
  error: function(...params: any[]) {
    if (enviromentConfig.isDevOrTestEnviroment()) {
      signale.error(...params)
    }
  },
  debug: function(...params: any[]) {
    if (enviromentConfig.isDevOrTestEnviroment()) {
      signale.debug(...params)
    }
  },
  info: function(...params: any[]) {
    if (enviromentConfig.isDevOrTestEnviroment()) {
      signale.info(...params)
    }
  },
  success: function(...params: any[]) {
    if (enviromentConfig.isDevOrTestEnviroment()) {
      signale.success(...params)
    }
  },
  log: function(...params: any[]) {
    if (enviromentConfig.isDevOrTestEnviroment()) {
      console.log(...params)
    }
  },
  emptyLine: function() {
    if (enviromentConfig.isDevOrTestEnviroment()) {
      console.log()
    }
  },
}
