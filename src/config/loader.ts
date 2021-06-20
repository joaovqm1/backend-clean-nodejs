
import dotenv from 'dotenv'

dotenv.config({ path: '.env.defaults' })
dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' })
