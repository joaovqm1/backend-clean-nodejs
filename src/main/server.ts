import app from '@/main/config/app'
import { serverConfig } from '@/config'

app.listen(serverConfig.port, () =>
  console.log(`Server running at: http://localhost:${serverConfig.port}`)
)
