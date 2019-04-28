import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import uuid from 'uuid/v1'
import doctor from 'doctor-zhivago'
import { version } from './package.json'
import config from './config'
import log from './utils/log'
import eventsRouter from './routes/events'
import db from './components/db-config/index'
import * as Events from './components/meetup-lib/stream-events'

// create Express server
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

// create healthcheck
app.get('/', doctor({
  mysql: true,
  version,
}))

//Create Tables
db.sequelize.sync()
.then(() => {
  log.info('Database & tables created!');
  // Fetching Meetup events
  Events.fetching();
})

app.use('/events/upcoming', eventsRouter)

app.listen(config.port, () => {
  log.info('❄️  api started 🚀 ', {
    port: config.port,
    env: config.env,
  })
})

module.exports = app;
