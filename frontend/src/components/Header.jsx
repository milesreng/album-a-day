/* eslint-disable react/prop-types */
import React from 'react'
// import { FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import stats from '../assets/stats-light.svg'
import Anon from '../assets/avatar.jpg'

const Header = ({ user, isLineup }) => {
  console.log(user)
  return (
    <div>
      {user && <div className='w-full flex flex-row justify-between p-4'>
      <div className='my-auto pl-4 flex flex-row gap-4 basis-3/4'>
        
          <h1 className='text-lg md:text-3xl uppercase font-header my-auto flex flex-row gap-4 md:basis-1/3'>
          
            {/* <span className='hidden md:flex'>Spotify Wrapped Preview</span> */}
            <Link to='/dashboard'>
              <div className='flex flex-row gap-4 justify-center align-middle basis-1/2'>
                <img className='w-6 md:w-8'
                  src={stats} alt="" />
                  <span className='hidden md:flex w-full'>spotify stats</span>
              </div>
            </Link>
          </h1>
        <div className='h-full my-auto'>
          {!isLineup && (
            <div className='my-auto text-xs text-center border border-gunmetal-50 px-2 md:px-4 py-2 rounded-md uppercase bg-gunmetal-900 hover:font-bold'>
              <Link to='/lineup'>
                view my festival lineup
              </Link>
            </div>
          )}
        </div>
        {/* <Link to='/'>back to home</Link> */}
      </div>
      <div className='flex flex-row gap-24 px-2'>
        <a className='flex flex-row gap-4'
          target='_blank'
          rel='noreferrer'
          href={user.external_urls.spotify}>
          <div className='text-right my-auto'>
            <p className='my-auto text-sm md:text-lg'>{user.display_name}</p>
            <p className='text-gunmetal-500 text-xs'>@{user.id}</p>
          </div>
          <img className='rounded-full w-12 h-12 md:w-16 md:h-16'
            src={user.images[0] ? user.images[0].url : Anon} 
            alt={`${user.name} profile photo`} />
        </a>
      </div>
    </div>}
    </div>
  )
}

export default Header