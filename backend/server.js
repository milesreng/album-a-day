require('dotenv').config()
const express = require('express')

const spotifyWebApi = require('spotify-web-api-node')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 9000

const credentials = {
  clientID: process.env.SPOTIFY_CLIENT_ID,
  idSecret: process.env.BASE64_ENCODED,
  redirectURI: process.env.DEV_REDIRECT_URI
}

// app.get('/', (request, response) => {
//   console.log('hello world')
// })

app.post('/refresh', (request, response) => {
  const refreshToken = request.body.refreshToken
  // console.log("Hii");
  let spotifyApi = new spotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
    refreshToken,
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

app.post('/login', ((request, response) => {
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

app.listen(PORT, () => {
  console.log(`app listening on PORT ${PORT}`)
})