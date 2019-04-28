import db from '../components/db-config/index'

const Settings = db.sequelize.define('settings', {
  id: {
    type: db.Sequelize.INTEGER(),
    primaryKey: true,
    autoIncrement: true,
  },
  key: {
    type: db.Sequelize.STRING(),
    allowNull: false,
  },
  value: {
    type: db.Sequelize.JSON(),
    allowNull: false
  }
})

module.exports = Settings