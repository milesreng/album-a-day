import React from 'react'
import RecordSpinner from '../components/RecordSpinner'
import { Link } from 'react-router-dom'
import { loginURL } from '../spotify'

const HomeScreen = () => {
  return (
    <div className='w-full flex flex-col justify-around h-screen text-center font-content'>
      <div className='h-screen flex flex-col justify-center gap-12 text-gunmetal-50'>
        <RecordSpinner />
        <div className='flex flex-col gap-4'>
          <h1 className='text-6xl font-header uppercase'>Spotify-Wrapped-Preview</h1>
          <div className='flex flex-row w-full justify-center gap-8 md:gap-24 text-lg py-4 font-header'>
            {/* <button className=' rounded-md border-2 border-gunmetal-900 bg-gunmetal-50 text-gunmetal-900 px-8 text-center hover:bg-gunmetal-100 transition-colors duration-300'>Register</button> */}
            <button className=' rounded-md border-2 font-content bg-spotify-green border-gunmetal-900 hover:font-bold text-gunmetal-900 lowercase px-8 py-2 shadow-lg text-center transition-colors duration-300'>
              <Link to='/login'>
                Login with Spotify
              </Link>
            </button>
          </div>
          {/* <Link to='/search' 
            className='font-content underline hover:text-gunmetal-100 transition-colors duration-400'>
            explore music
          </Link> */}
        </div>
      </div>
    </div>
  )
}

export default HomeScreen