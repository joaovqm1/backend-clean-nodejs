const sonarqubeScanner = require('sonarqube-scanner')

sonarqubeScanner(
  {
    serverUrl: process.env.SONAR_SERVER || 'http://localhost:9000',
    token: process.env.SONAR_TOKEN || '4e1a1a56d2b300a17aca62b42707e99ec818305b',
    options: {}
  },
  () => {
    console.log('>> Sonar analysis is done!')
  }
)