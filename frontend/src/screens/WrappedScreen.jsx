import React from 'react'
import { useState, useEffect } from 'react'
import { redirect, useNavigate } from 'react-router-dom'
import { Buffer } from 'buffer'

import Wrapped from '../components/Wrapped'

const WrappedScreen = () => {
  const navigate = useNavigate()

  const [code, setCode] = useState()
  const [accessToken, setAccessToken] = useState()
  
 
  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
  const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI

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

      const response = await fetch('https://accounts.spotify.com/api/token', payload)
        .then(response => response.json())
        .catch(error => console.log('ERROR' + error.message))

      if (!response) {
        return redirect('/')
      }
      console.log(response)

      localStorage.setItem('access_token', response.access_token)
      
      setAccessToken(response.access_token)
      
    } 

    if (code && localStorage.getItem('access_token') === null) {
      getToken(code)
    }

    setAccessToken(localStorage.getItem('access_token'))
    

  }, [code])

  useEffect(() => {
    if (accessToken === null) {
      redirect('/')
    }
  }, [accessToken])


  const handleLogout = () => {
    localStorage.removeItem('access_token')
    
    setAccessToken('')
    

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