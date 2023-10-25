/* eslint-disable react/prop-types */
import React from 'react'
// import { FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Header = (props) => {
  return (
    <div className='w-full flex flex-row justify-between p-4'>
      <div className='my-auto pl-4'>
        <h1 className='text-3xl md:text-4xl uppercase font-header'>Spotify-Wrapped-Preview</h1>
        {/* <Link to='/'>back to home</Link> */}
      </div>
      <div>
        <a className='flex flex-row gap-4'
          href={props.url}>
          <div className='text-right my-auto'>
            <p className='my-auto text-lg'>{props.name}</p>
            <p className='text-gunmetal-500 text-sm'>@{props.username}</p>
          </div>
          <img className='rounded-full'
            src={props.img} 
            alt={`${props.name} profile photo`} />
        </a>
      </div>
    </div>
  )
}

export default Header