/* eslint-disable react/prop-types */
import React from 'react'
// import { FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Header = ({ user }) => {
  console.log(user)
  return (
    <div className='w-full flex flex-row justify-between p-4'>
      <div className='my-auto pl-4'>
        <h1 className='text-3xl md:text-4xl uppercase font-header'>
          <Link to='/'>Spotify-Wrapped-Preview</Link>
        </h1>
        {/* <Link to='/'>back to home</Link> */}
      </div>
      <div>
        <a className='flex flex-row gap-4'
          href={user.external_urls.spotify}>
          <div className='text-right my-auto'>
            <p className='my-auto text-lg'>{user.display_name}</p>
            <p className='text-gunmetal-500 text-sm'>@{user.id}</p>
          </div>
          <img className='rounded-full w-12 md:w-16'
            src={user.images[0].url} 
            alt={`${user.name} profile photo`} />
        </a>
      </div>
    </div>
  )
}

export default Header