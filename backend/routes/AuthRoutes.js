const express = require('express')

const router = express.Router()

let SpotifyWebApi = require('spotify-web-api-node')
let scopes = ['user-read-private', 'user-read-email','playlist-modify-public','playlist-modify-private']

require('dotenv').config()

let spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI
})


router.post('/refresh', (request, response) => {
  const refreshToken = request.body.refreshToken
  // console.log("Hii");
  let spotifyApi = new spotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
  })

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      // console.log(data.body);
      response.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      })

    })
    .catch((err) => {
      console.log(err)
      response.sendStatus(400)
    })
})

router.get('/login', ((request, response) => {
  var spotifyAPI = new spotifyWebApi(credentials)
  const code = request.body.code

  spotifyAPI.authorizationCodeGrant(code).then((data) => {
    response.json({
      accessToken: data.body.access_token,
      refreshToken : data.body.refresh_token,
      expiresIn : data.body.expires_in
    })
  }).catch(error => {
    console.log(error)
    response.sendStatus(400)
  })
}))

module.exports = router