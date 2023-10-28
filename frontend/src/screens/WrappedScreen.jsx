import React from 'react'
import { useState, useEffect } from 'react'
import { redirect, useNavigate } from 'react-router-dom'
import { Buffer } from 'buffer'

import Wrapped from '../components/Wrapped'

const WrappedScreen = () => {
  const navigate = useNavigate()

  const [code, setCode] = useState()
  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
 
  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
  const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
  const REDIRECT_URI = import.meta.env.VITE_DEV_REDIRECT_URI
  const HOUR_MS = 60000 * 60

  useEffect(() => {

    const urlParams = new URLSearchParams(window.location.search)
    setCode(urlParams.get('code'))
    let codeVerifier = localStorage.getItem('code_verifier')
    
    const getToken = async (code) => {

      const payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
        },
        body: new URLSearchParams({
          client_id: CLIENT_ID,
          grant_type: 'authorization_code',
          code,
          redirect_uri: REDIRECT_URI,
          code_verifier: codeVerifier
        })
      }

      const response = await fetch('https://accounts.spotify.com/api/token', payload).then(response => response.json())

      if (!response) {
        return redirect('/')
      }
      console.log(response)

      localStorage.setItem('access_token', response.access_token)
      localStorage.setItem('refresh_token', response.refresh_token)
      setAccessToken(response.access_token)
      setRefreshToken(response.refresh_token)
    } 

    if (localStorage.getItem('access_token') === null) {
      getToken(code)
    }

    setAccessToken(localStorage.getItem('access_token'))
    setRefreshToken(localStorage.getItem('refresh_token'))

  }, [code])

  useEffect(() => {
    if (accessToken === null) {
      redirect('/')
    }
  }, [accessToken])

  // useEffect(() => {

  //   const getRefreshToken = async () => {
  //     const payload = {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded'
  //       },
  //       body: new URLSearchParams({
  //         grant_type: 'refresh_token',
  //         refresh_token: refreshToken,
  //         client_id: CLIENT_ID
  //       }),
  //     }
  //     const body = await fetch('https://accounts.spotify.com/api/token', payload)
  //     const response = await body.json()

  //     console.log('refresh: ' + response)
  
  //     localStorage.setItem('access_token', response.accessToken)
  //     localStorage.setItem('refresh_token', response.refreshToken)
  //     setAccessToken(response.access_token)
  //     setRefreshToken(response.refresh_token)
  //  }
   
  //  const interval = setInterval(() => {
  //   getRefreshToken()
  //   console.log('refreshes every hour')
  // }, HOUR_MS);
  
  //   return () => clearInterval(interval) // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  // }, [])

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setAccessToken('')
    setRefreshToken('')

    navigate('/')
  }

  return (
    <div className='flex flex-col min-h-screen w-full'>
      {accessToken && <Wrapped token={accessToken} />}
      <div className='w-1/3 md:w-1/6 mx-auto my-8'>
        <button onClick={handleLogout}
          className='text-center w-full bg-spotify-green uppercase rounded-full py-1'>
            logout
        </button>
      </div>
    </div>
  )
}

export default WrappedScreen