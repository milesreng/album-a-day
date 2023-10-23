/* eslint-disable react/prop-types */
import React from 'react'
import Loader from './Loader'

const Album = ({ album }) => {
  console.log(album)
  return (
    <div className='flex flex-row'>
      <div className='basis-1/4'>
        <img src={album.images[0].url} alt={album.title} />
      </div>
      <div className='basis-3/4 pl-2'>
      </div>
    </div>
  )
}

export default Album