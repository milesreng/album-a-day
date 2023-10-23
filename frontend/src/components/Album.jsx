/* eslint-disable react/prop-types */
import React from 'react'
import Loader from './Loader'

const Album = ({ album }) => {
  console.log(album)
  return (
    <div className='flex flex-row shadow-lg border-2 border-gunmetal font-content'>
      <div className='basis-1/4'>
        <img src={album.images[0].url} alt={album.name} />
      </div>
      <div className='basis-3/4 p-2 md:p-6 font-header text-xl md:text-2xl'>
        <a href={album.href}
          className='font-header font-normal hover:font-bold uppercase tracking-wide hover:cursor-pointer'>{album.name}</a>
      </div>
    </div>
  )
}

export default Album