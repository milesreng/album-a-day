const express = require('express')
const querystring = require('querystring')
const axios = require('axios')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const REDIRECT_URI = process.env.REDIRECT_URI
const BASE64_ENCODED = process.env.BASE64_ENCODED

const router = express.Router()

router.get('/', (request, response) => {
  const scope = 'user-read-private user-read-email'

  response.redirect('://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: scope,
      redirect_uri: REDIRECT_URI
    }))
})

router.get('/callback', async (request, response) => {
  const spotifyResponse = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
    grant_type: 'authorization_code',
    code: request.query.code,
    redirect_uri: REDIRECT_URI
  }),
  {
    headers: {
      Authorization: 'Basic ' + BASE64_ENCODED,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })

  console.log(spotifyResponse)

//   const sessionJWTObject = {
//     token: spotifyResponse.access_token,
// }

//   request.session.jwt = jwt.sign(sessionJWT)

  response.send(JSON.stringify(spotifyResponse.data))
})

module.exports = router