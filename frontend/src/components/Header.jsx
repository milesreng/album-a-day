/* eslint-disable react/prop-types */
import React from 'react'
// import { FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Header = ({ user }) => {
  return (
    <div>
      {user && <div className='w-full flex flex-row justify-between p-4'>
      <div className='my-auto pl-4 flex flex-row gap-12'>
        <h1 className='text-lg md:text-4xl uppercase font-header'>
          <Link to='/'><span>Spotify-Wrapped-Preview</span></Link>
        </h1>
        {/* <Link to='/'>back to home</Link> */}
      </div>
      <div className='flex flex-row gap-24'>
        <a className='flex flex-row gap-4'
          href={user.external_urls}>
          <div className='text-right my-auto'>
            <p className='my-auto text-md md:text-lg'>{user.display_name}</p>
            <p className='text-gunmetal-500 text-sm'>@{user.id}</p>
          </div>
          <img className='rounded-full w-12 h-12 md:w-16 md:h-16'
            src={user.images[0].url} 
            alt={`${user.name} profile photo`} />
        </a>
      </div>
    </div>}
    </div>
  )
}

export default Header