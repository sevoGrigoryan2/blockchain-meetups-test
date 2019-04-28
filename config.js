export default {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 8080,
  ip: process.env.IP || '0.0.0.0',
  meetupCredentials: {
    secret: 'bel9coh1vemsappfpa2shp74pv',
    key: 'f95quirktcv53ovkbi8g058ror',
    redirectUrl: 'http://localhost:8080/callback',
    code: 'adac05fd7ff41417a86efd1ae4afa061',
    schema: 'https://',
    refreshToken: 'a12265394c38d0deab31be374dc0bc11',
    streemEvents: {
      api: 'api.meetup.com',
      path: '/2/open_events.json?',
      queryParams: 'topic=blockchain',
      filter: {
        'keywords': [
          'blockchain',
          'cryptocurrency',
          'ethereum',
          'bitcoin'
        ]
      }
    }
  }
}