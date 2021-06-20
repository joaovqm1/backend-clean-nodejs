require('./loader')

const serverPort = process.env.PORT || 5000
const serverUrl = process.env.SERVER_URL || 'http://localhost'
export const serverConfig = {
  port: serverPort,
  url: serverUrl
}
