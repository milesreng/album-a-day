import React from 'react'
// import { FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='p-4'>
      <Link to='/'
        className='text-default-bg font-content underline hover:text-gunmetal-100 transition-all duration-400 text-sm md:text-md'>
        back to home
        </Link>
    </div>
  )
}

export default Header