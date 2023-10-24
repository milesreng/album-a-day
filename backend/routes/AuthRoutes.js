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

router.get('/', (request, response) => {
  response.render('index')
})

router.get('/login', (request, response) => {
  let html = spotifyApi.createAuthorizeURL(scopes)
  response.send()
})