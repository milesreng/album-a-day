/* eslint-disable react/prop-types */
import React from 'react'
// import { FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import stats from '../assets/stats-light.svg'

const Header = ({ user, isLineup }) => {
  return (
    <div>
      {user && <div className='w-full flex flex-row justify-between p-4'>
      <div className='my-auto pl-4 flex flex-row gap-2 md:gap-4 basis-3/4'>
        
          <h1 className='text-lg md:text-3xl uppercase font-header my-auto flex flex-row gap-4 md:basis-1/4'>
          
            {/* <span className='hidden md:flex'>Spotify Wrapped Preview</span> */}
            <Link to='/'>
              <div className='flex flex-row gap-4 justify-center align-middle'>
                <img className='w-6 md:w-8'
                  src={stats} alt="" />
                  <span className='hidden md:flex'>spotify stats</span>
              </div>
            </Link>
          </h1>
        <div className=''>
          {!isLineup && (<div className='text-xs text-center border border-gunmetal-50 px-2 md:px-4 py-2 rounded-md uppercase bg-default-bg text-gunmetal hover:font-bold'>
              <Link to='/lineup'>
                view my festival lineup
              </Link>
          </div>)}

        </div>
        {/* <Link to='/'>back to home</Link> */}
      </div>
      <div className='flex flex-row gap-24 px-2'>
        <a className='flex flex-row gap-4'
          href={user.external_urls}>
          <div className='text-right my-auto'>
            <p className='my-auto text-sm md:text-lg'>{user.display_name}</p>
            <p className='text-gunmetal-500 text-xs'>@{user.id}</p>
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