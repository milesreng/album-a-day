import querystring from 'querystring'

const auth_endpoint = 'https://accounts.spotify.com/authorize?'
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID

const scope = 'streaming user-read-email user-read-private'

export const loginURL = auth_endpoint +
  querystring.stringify({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: scope,
    redirect_uri: 'http://localhost:5173/dashboard'
  })