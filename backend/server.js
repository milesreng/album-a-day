const express = require('express')
const querystring = require('querystring')
const axios = require('axios')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const BASE64_ENCODED = process.env.BASE64_ENCODED


const app = express()

app.get('/', (request, response) => {
  const scope = 'user-read-private user-read-email'

  response.send(
    '<a href=\'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: scope,
      redirect_uri: REDIRECT_URI
    }) + '\'>Sign in</a>')
})

app.get('/callback', async (request, response) => {
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
  response.send(JSON.stringify(spotifyResponse.data))
})

const PORT = 3001
app.listen(PORT, () => console.log(`console running on PORT ${PORT}`))