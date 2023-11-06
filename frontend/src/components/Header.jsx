/* eslint-disable react/prop-types */
import React from 'react'
// import { FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import stats from '../assets/stats-gunmetal.svg'
import statsLight from '../assets/stats-light.svg'
import Anon from '../assets/avatar.jpg'

const Header = ({ user }) => {
  return (
    <div className={`dark:text-default-bg`}>
      {user && <div className='w-full flex flex-row justify-between p-4'>
      <div className='my-auto pl-4 flex flex-row gap-4 md:w-1/4'>
        
          <h1 className='text-lg md:text-3xl uppercase font-header my-auto flex flex-row gap-4 w-6'>
          
            {/* <span className='hidden md:flex'>Spotify Wrapped Preview</span> */}
            <Link to='/dashboard'>
              <div className='flex flex-row gap-4 justify-center align-middle'>
                <img className='w-6 md:w-8 dark:flex hidden'
                  src={statsLight} alt="" />
                <img className='w-6 md:w-8 dark:hidden flex'
                  src={stats} alt="" />
                  <span className='hidden md:block w-48 tracking-widest text-4xl text-gunmetal'>statify</span>
              </div>
            </Link>
          </h1>
      </div>
        <div className='flex flex-row md:justify-between md:w-1/4 mx-auto uppercase font-content my-auto text-sm md:text-md'>
        <Link to='/dashboard'>
            <div className='underline px-2 md:px-0 hover:shadow-lg rounded-md md:w-24 py-1 text-center transition-all duration-300'>
              dashboard
            </div>
          </Link>
          <Link to='/tracks'>
            <div className='underline px-2 md:px-0 hover:shadow-lg rounded-md md:w-24 py-1 text-center transition-all duration-300'>
              tracks
            </div>
          </Link>
          <Link to='/artists'>
            <div className='underline hover:shadow-lg px-2 md:px-0 rounded-md md:w-24 py-1 text-center transition-all duration-300'>
              artists
            </div>
          </Link>
        </div>
      <div className='flex flex-row px-2 md:basis-1/4 justify-end'>
        <a className='flex flex-row gap-4'
          target='_blank'
          rel='noreferrer'
          href={user.external_urls.spotify}>
          <div className='text-right my-auto hidden md:block'>
            <p className='my-auto text-sm md:text-lg'>{user.display_name}</p>
            <p className='text-gunmetal-500 dark:text-gunmetal-100 text-xs'>@{user.id}</p>
          </div>
          <div className=' w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16'>
            <img className='rounded-full overflow-hidden'
              src={user.images[0] ? user.images[0].url : Anon} 
              alt={`${user.name} profile photo`} />
          </div>
        </a>
      </div>
    </div>}
    </div>
  )
}

export default Header