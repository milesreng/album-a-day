const SpotifyWebApi = require('spotify-web-api-node')
const querystring = require('querystring')
const express = require('express')
const router = express.Router()

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_ID
const REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:3000/callback'
const STATE_KEY = 'spotify_auth_state'

const scope = 'streaming user-read-email user-read-private'

const spotifyAPI = new SpotifyWebApi({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URI
})

const generateRandomString = (length) => (Math.random().toString(36) + Array(length).join('0')).slice(2, length + 2)

// Login endpoint
router.get('/login', (request, response) => {
  const state = generateRandomString(16)
  response.cookie(STATE_KEY, state)
  response.redirect(spotifyAPI.createAuthorizeURL(scope, state))
})

// Callback endpoint
router.get('/callback', (request, response) => {
  const { code, state } = request.query
  const storedState = request.cookies ? request.cookies[STATE_KEY] : null

  if (state === null || state !== storedState) {
    response.redirect('/#/error/state mismatch')
  } else {
    response.clearCookie(STATE_KEY)
    spotifyAPI.authorizationCodeGrant(code).then(data => {
      const { expires_in, access_token, refresh_token } = data.body

      spotifyAPI.setAccessToken(access_token)
      spotifyAPI.setRefreshToken(refresh_token)

      spotifyAPI.getMe().then(({ body }) => {
        console.log(body)
      })
    }).catch((error) => response.redirect('/#/error/invalid token'))
  }
})

module.exports = router