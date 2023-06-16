import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import config from 'config'
import log from './utils/logger'
import connect from './utils/connect'
import routes from './routes'
import deserializeUser from './middleware/deserializeUser'
import swaggerDocs from './utils/swagger'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const port = config.get('port') as number
const host = config.get('host') as string

const app = express()
// app.use(
//   cors({
//     origin: config.get('origin'),
//     credentials: true,
//   }),
// )
app.use(cookieParser())
app.use(express.json())
app.use(deserializeUser)
app.use(express.urlencoded({ extended: false }))

app.listen(port, host, () => {
  log.info(`Server listing at http://${host}:${port}`)
  connect()

  routes(app)
  swaggerDocs(app, port)
})
