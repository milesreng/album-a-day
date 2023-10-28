import React from 'react'
import { useState, useEffect } from 'react'
import RecordSpinner from '../components/RecordSpinner'
import { generateRandomString, sha256, base64encode } from '../services/pkceFunctions'

const codeVerifier  = generateRandomString(64)
const hashed = await sha256(codeVerifier)
const codeChallenge = base64encode(hashed)

const HomeScreen = () => {
  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
  const REDIRECT_URI = import.meta.env.VITE_DEV_REDIRECT_URI
  const auth_url = new URL(import.meta.env.VITE_AUTH_ENDPOINT)

  const scope = 'streaming user-read-email user-read-private user-top-read'

  window.localStorage.setItem('code_verifier', codeVerifier)

  const params = {
    response_type: 'code',
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    scope: scope
  }

  auth_url.search = new URLSearchParams(params).toString()

  useEffect(() => {
    window.localStorage.removeItem('access_token')
    window.localStorage.removeItem('refresh_token')
  })

  // const [accessToken, setAccessToken] = useState()

  // useEffect(() => {
  //   // const prep = async () => await logout()
  //   // prep()

  //   const hash = window.location.hash
  //   var access_token = window.localStorage.getItem('access_token')

  //   if (hash && hash) {
  //     console.log(hash)
  //     access_token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1]
  //     // refresh_token = hash.substring(1).split('&').find(elem => elem.startsWith('refresh_token')).split('=')[1]

  //     window.location.hash = ''
  //     window.localStorage.setItem('access_token', access_token)
  //   }

  //   setAccessToken(access_token)
  // }, [])

  // const logout = () => {
  //   setAccessToken('')
  //   // window.localStorage.removeItem('token')
  // }

  return (
    <div className='w-full flex flex-col justify-around min-h-screen text-center font-content pb-8'>
      <div className='h-full flex flex-col justify-center gap-12 text-gunmetal-50'>
        {/* <RecordSpinner /> */}
          <div className='flex flex-col gap-4'>
            {/* <h1 className='  text-6xl text-center font-header uppercase w-11/12 mx-auto md:w-full'>Spotify Wrapped Preview</h1> */}
            <div className='flex flex-row w-full justify-center gap-8 md:gap-24 text-lg py-4 font-header bg-gunmetal-900'>
              <button className=' rounded-md border-2 font-content bg-spotify-green border-gunmetal-900 hover:font-bold text-gunmetal-900 lowercase px-8 py-2 shadow-lg text-center transition-colors duration-300'>
                <a href={auth_url}>
                  Login with Spotify
                </a>
              </button>
            </div>
          </div>
    </div>
    </div>
  )
}

export default HomeScreen
