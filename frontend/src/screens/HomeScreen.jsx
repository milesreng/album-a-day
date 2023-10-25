import React from 'react'
import { useState, useEffect } from 'react'
import RecordSpinner from '../components/RecordSpinner'
import querystring from 'querystring'

import Wrapped from '../components/Wrapped'
import Dashboard from '../components/Dashboard'

const HomeScreen = () => {
  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI
  const AUTH_ENDPOINT = import.meta.env.VITE_AUTH_ENDPOINT

  const scope = 'streaming user-read-email user-read-private user-top-read'

  const loginUrl = AUTH_ENDPOINT +
  querystring.stringify({
    response_type: 'token',
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: scope
  })

  const [accessToken, setAccessToken] = useState()

  useEffect(() => {
    const hash = window.location.hash
    var token = window.localStorage.getItem('token')

    if (hash && hash) {
      token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1]
      window.location.hash = ''
      window.localStorage.setItem('token', token)
    }

    setAccessToken(token)
  }, [])

  const logout = () => {
    setAccessToken('')
    window.localStorage.removeItem('token')
  }

  return (
    <div className='w-full flex flex-col justify-around min-h-screen text-center font-content pb-8'>
      <div className='h-full flex flex-col justify-center gap-12 text-gunmetal-50'>
        {!accessToken && (
          <>
          <RecordSpinner />
          <div className='flex flex-col gap-4'>
            <h1 className='text-6xl font-header uppercase w-11/12 mx-auto md:w-full'>Spotify-Wrapped-Preview</h1>
            <div className='flex flex-row w-full justify-center gap-8 md:gap-24 text-lg py-4 font-header bg-gunmetal-900'>
              <button className=' rounded-md border-2 font-content bg-spotify-green border-gunmetal-900 hover:font-bold text-gunmetal-900 lowercase px-8 py-2 shadow-lg text-center transition-colors duration-300'>
                <a href={loginUrl}>
                  Login with Spotify
                </a>
              </button>
            </div>
          </div>
          </>
        )}
        {accessToken && (
          <div className='flex flex-col h-full bg-gunmetal justify-between'>
            <Wrapped token={accessToken} />
            {/* <Dashboard token={accessToken} className='bg-gunmetal' /> */}
            {/* <button className='bg-spotify-green text-default-bg w-1/6 rounded-full mx-auto my-8 py-2 uppercase'
              onClick={logout}>
                Logout
            </button> */}
          </div>
        )}
      </div>
        {accessToken && (
          <div className='bg-gunmetal pt-2 pb-8'>
            <button className='bg-spotify-green px-8 py-1 rounded-full uppercase'
              onClick={logout}>Logout</button>
          </div>
        )}
    </div>
  )
}

export default HomeScreen