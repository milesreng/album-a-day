import React from 'react'
import { Link } from 'react-router-dom'

const ErrorScreen = () => {
  return (
    <div className='w-full text-center h-screen flex flex-col justify-evenly'>
      <div className='flex flex-col gap-4 w-11/12 mx-auto'>
        Sorry, you don&apos;t have enough data to view your Spotify summary.
        <Link to='/'>
          <div className='px-4 py-2 border w-1/2 md:w-1/3 mx-auto border-gunmetal-50 rounded-md bg-spotify-green'>
            go back to home
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ErrorScreen