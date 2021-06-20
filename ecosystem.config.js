const dotenv = require('dotenv')
dotenv.config()

const secondsToRestart = 5

const cronRestart = '30 1 */1 * *' // todos os dias ás 1h30

const config = {
  name: 'projetei',
  script: './dist/main/server.js',
  node_args: '--max_old_space_size=4096',
  instances: '2',
  exec_mode: 'cluster',
  cron_restart: cronRestart,
  exp_backoff_restart_delay: 100,
  restart_delay: secondsToRestart * 1000,
  time: true,
  log_date_format: 'DD/MM/YYYY HH:mm',
  args: [
    '--color'
  ]
}

module.exports = {
  apps: [config]
}
