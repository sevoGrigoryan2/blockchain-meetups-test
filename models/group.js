import db from '../components/db-config/index'
import Event from './event'

const Group = db.sequelize.define('groups', {
  id: {
    type: db.Sequelize.STRING,
    primaryKey: true,
    // references :  { model: 'events', key: 'id' }
  },
  created: {
    type: db.Sequelize.DATE(),
    allowNull: false,
  },
  source: {
    type: db.Sequelize.ENUM(),
    allowNull: true,
    values: ['MEETUP', 'EVENTBRITE']
  },
  name: {
    type: db.Sequelize.STRING(),
    allowNull: true
  },
  url: {
    type: db.Sequelize.STRING(),
    allowNull: true
  },
  photoUrl: {
    type: db.Sequelize.STRING(),
    allowNull: true
  },
  sourceId: {
    type: db.Sequelize.STRING(),
    allowNull: true,
  }
})

module.exports = Group
