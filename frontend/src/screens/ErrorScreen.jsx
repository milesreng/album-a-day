import React from 'react'
import { Link } from 'react-router-dom'

const ErrorScreen = () => {
  return (
    <div>
      Sorry, you don&apos;t have enough data to view your Spotify summary.
      <Link to='/'>
        <div className='px-4 py-2 border border-gunmetal-50 rounded-md hover:bg-gunmetal-700'>
          go back to home
        </div>
      </Link>
    </div>
  )
}

export default ErrorScreen