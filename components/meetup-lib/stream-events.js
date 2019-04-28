import request from 'request'
import uuid from 'uuid/v1'
import { find } from 'lodash'
import { getAccessToken } from './authentication'
import config from '../../config'
import Event from '../../models/event'
import Group from '../../models/group'
import log from '../../utils/log'

export const fetching = () => new Promise(async (resolve, reject) => {
  try {
    const tokenDetails = await getAccessToken()
    const accessToken = JSON.parse(tokenDetails).access_token
    const { schema } = config.meetupCredentials
    const { api, path, queryParams } = config.meetupCredentials.streemEvents
    const options = {
      url: `${schema}${api}${path}${queryParams}`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      method: 'GET'
    }
    request(options, async (err, res, body) => {
      if (err) throw new Error(err)
      const parsedResponse = JSON.parse(body)
      await mappingData(parsedResponse.results)
      resolve(parsedResponse)
    })
  } catch (error) {
    console.log('Error')
    reject(error)
  }
})


const mappingData = (data) => new Promise(async (resolve, reject) => {
  try {
    const { keywords } = config.meetupCredentials.streemEvents.filter
    const allEvents = await Event.findAll()
    const allGroups = await Group.findAll()
    const eventsIdsArr = []
    const groupsIdsArr = []
    for (const x of data) {
      const isExistEvent = find(allEvents, { 'sourceId': x.id })
      if (!isExistEvent 
        && x.description 
        && x.name
        && x.venue
        && !find(eventsIdsArr, { id: x.id })
        && (x.name.includes(keywords[0]) || x.name.includes(keywords[0]) || x.name.includes(keywords[0]) || x.name.includes(keywords[0])
        || x.description.includes(keywords[0]) || x.description.includes(keywords[0]) || x.description.includes(keywords[0]) || x.description.includes(keywords[0])
        )) {
        let eventObj = {
          id: uuid(),
          created: new Date().toISOString(),
          source: 'MEETUP',
          name: x.name,
          description: typeof x.description !== 'string' ? x.description.toString() : x.description,
          url: x.event_url,
          photoUrl: x.photo_url,
          sourceId: x.id,
          time: x.time,
          timeLocal: x.utc_offset,
          country: x.venue.country,
          city: x.venue.city,
          lat: x.venue.lat,
          lon: x.venue.lat,
        }
        if (x.group && !find(groupsIdsArr, { id: x.group.id })) { //find(groupsIdsArr, { id: x.group.id })
          const isExistGroup = find(allGroups, { 'sourceId': x.group.id })
          let groupId = uuid()
          if (!isExistGroup) {
            await Group.create({
              id: groupId,
              created: new Date().toISOString(),
              source: 'MEETUP',
              name: x.group.name,
              url: x.group.urlname,
              photoUrl: x.group.group_photo ? x.group.group_photo.thumb_link : null,
              sourceId: x.group.id
            })
            eventObj.group = groupId
          }
        }
        await Event.create(eventObj)
        eventsIdsArr.push({ id: x.id })
        groupsIdsArr.push({ id: x.group.id })
      }
    }
    log.info('Finish Fetching')
    return
  } catch (error) {
    console.log('error in mappingData', error)
    reject(error)
  }
})