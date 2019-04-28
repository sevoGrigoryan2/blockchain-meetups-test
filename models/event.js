import db from '../components/db-config/index'
import Group from './group'

const Event = db.sequelize.define('events', {
  id: {
    type: db.Sequelize.STRING(),
    primaryKey: true,
    allowNull: false,
  },
  created: {
    type: db.Sequelize.DATE(),
    allowNull: true,
  },
  source: {
    type: db.Sequelize.ENUM(),
    allowNull: true,
    values: ['MEETUP', 'EVENTBRITE']
  },
  name: {
    type: db.Sequelize.STRING(100),
    allowNull: true
  },
  description: {
    type: db.Sequelize.BLOB('medium'),
    allowNull: true,
    get() {
      return this.getDataValue('description').toString('utf8');
    },
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
  },
  time: {
    type: db.Sequelize.DATE(),
    allowNull: true
  },
  timeLocal: {
    type: db.Sequelize.STRING(),
    allowNull: true 
  },
  country: {
    allowNull: true,
    type: db.Sequelize.STRING()
  },
  city: {
    type: db.Sequelize.STRING(),
    allowNull: true
  },
  lat: {
    type: db.Sequelize.FLOAT(),
    allowNull: true
  },
  lon: {
    type: db.Sequelize.FLOAT(),
    allowNull: true
  },
  group: {
    type: db.Sequelize.STRING(),
    references: {
       model: 'groups',
       key: 'id',
    }
 }
})

Event.hasMany(Group, { foreignKey: 'id', sourceKey: 'group', allowNull: true, defaultValue: null, constraints: false});

module.exports = Event