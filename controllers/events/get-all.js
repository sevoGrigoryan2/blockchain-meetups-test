import Event from '../../models/event'
import Group from '../../models/group'
import log from '../../utils/log'

export const handler = (req, res) => new Promise(async() => {
  try {
    const { offset, limit } = req.query
    if (!offset || !limit) throw new Error('Missing query params')
    const events = await Event.findAll({
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