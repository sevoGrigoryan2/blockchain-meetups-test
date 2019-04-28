import request from 'request'
import Settings from '../../models/settings'

import config from '../../config'
export const getAccessToken = () => new Promise(async (resolve, reject) => {
  try {
    let authSettings = await Settings.findAll({
      where:{
        key: 'auth'
      }
    })
    const options = {
      url: 'https://secure.meetup.com/oauth2/access',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: {
        client_id: config.meetupCredentials.key,
        client_secret: config.meetupCredentials.secret,
        grant_type: 'refresh_token',
        refresh_token: (authSettings && authSettings.length > 0) ?  JSON.parse(authSettings[0].value).refresh_token : config.meetupCredentials.refreshToken
      }
    }

    request(options, async (err, res, body) => {
      if (err) throw new Error(err)
      (authSettings && authSettings.length > 0) ? await Settings.update({
        value: JSON.parse(body)
      },{
        where: {
          id: authSettings[0].id
        }
      }) : await Settings.create({
        key: 'auth',
        value: parsedResponse
      })
      resolve(body);
    })
  } catch (error) {
    console.log(error);
    reject(error);
  }
})