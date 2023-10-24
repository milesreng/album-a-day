import React from 'react'
import { Link } from 'react-router-dom'
import { loginURL } from '../spotify'

const LoginScreen = () => {
  return (
    <div className='flex flex-col'>
      <div className='w-11/12 md:w-1/2 mx-auto my-auto'>
        {/* <div className='flex flex-row'>
          <div className='w-1/6'>
            <img src={SpotifyLogo} alt='spotify logo'
              className='w-16' />
          </div>
          <h1 className='text-spotify-green text-4xl my-auto'>Spotify</h1>
        </div> */}
      <div className='text-center'>
        <a href={loginURL}
          className='bg-spotify-green px-2 py-1 rounded-md uppercase font-header'>
          Login with Spotify
        </a>
      </div>
      </div>
    </div>
  )
}

export default LoginScreen