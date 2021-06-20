import express, { Express, Router } from 'express'
import { readdirSync } from 'fs'

export const setupRoutes = (app: Express): void => {
  const router = Router()
  app.use(express.json())
  app.use('/api', router)
  readdirSync(`${__dirname.replace('config', 'routes')}`).map(
    async function(fileName) {
      ; (await import(`../routes/${fileName}`)).default(router)
    }
  )
}
