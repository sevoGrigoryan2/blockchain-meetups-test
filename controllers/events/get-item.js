import Event from '../../models/event'
import Group from '../../models/group'
import log from '../../utils/log'

export const handler = (req, res) => new Promise(async() => {
  try {
    const { id } = req.query
    const event = await Event.findAll({
      where: {
        id
      },
      include: 
      [{model: Group}]
    })

    res.json({
      error: false,
      result: event
    })
  } catch (err) {
    log.info('Error in get-all handler', err)
    res.status(409).json({
      error: true,
      message: err.message
    })
  }
})