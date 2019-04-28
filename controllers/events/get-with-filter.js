import Event from '../../models/event'
import Group from '../../models/group'
import log from '../../utils/log'
import db from '../../components/db-config/index'

export const handler = (req, res) => new Promise(async() => {
  try {
    const { offset, limit, city, country } = req.query
    if (!offset || !limit || (!city && !country)) throw new Error('Missing query params')

    let queryObject = {}
    if (country) queryObject.country = country;
    if (city) queryObject.city = db.Sequelize.where(db.Sequelize.fn('LOWER', db.Sequelize.col('city')), 'LIKE', '%' + city + '%');
    const events = await Event.findAll({
      where: queryObject,
      offset: Number(offset),
      limit: Number(limit),
      order: [[ 'created','ASC']],
      include: 
      [{model: Group}]
    })

    res.json({
      error: false,
      result: events
    })
  } catch (err) {
    log.info('Error in get-all handler', err)
    res.status(409).json({
      error: true,
      message: err.message
    })
  }
})