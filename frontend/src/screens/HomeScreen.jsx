import React from 'react'
import { useState, useEffect } from 'react'
import { generateRandomString, sha256, base64encode } from '../services/pkceFunctions'

import Stats from '../assets/stats-gunmetal.svg'

const codeVerifier  = generateRandomString(64)
const hashed = await sha256(codeVerifier)
const codeChallenge = base64encode(hashed)

const HomeScreen = () => {
  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
  const REDIRECT_URI = import.meta.env.VITE_DEV_REDIRECT_URI
  const auth_url = new URL(import.meta.env.VITE_AUTH_ENDPOINT)

  const scope = 'streaming user-read-email user-read-private user-top-read user-read-recently-played'

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
    
  })

  return (
    <div className='w-full flex flex-col justify-around min-h-screen text-center font-content pb-8 text-gunmetal'>
      <div className='h-full flex flex-col justify-center gap-12'>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-row w-5/6 md:w-1/3 mx-auto gap-4 justify-center'>
                <div className='w-12 h-12 my-auto'>
                  <img src={Stats} alt="" />
                </div>
                <div className='font-header text-6xl tracking-widest uppercase'>
                  Statify
                </div>
            </div> 
            <div className='flex flex-row w-full justify-center gap-8 md:gap-24 text-lg py-4 font-header'>
              <button className=' rounded-md font-header font-thin bg-spotify-green dark:border-gunmetal-900 hover:font-normal text-gunmetal-900 lowercase px-8 py-2 shadow-lg text-center transition-colors duration-300'>
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
