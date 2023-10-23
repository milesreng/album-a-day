/* eslint-disable react/prop-types */
import React from 'react'
import Loader from './Loader'

const Album = ({ album }) => {
  console.log(album)
  return (
    <div className='flex flex-row shadow-lg border-2 border-gunmetal rounded-md font-content'>
      <div className='basis-1/4'>
        <img src={album.images[0].url} alt={album.name} />
      </div>
      <div className='basis-3/4 p-4 font-content'>
        <h1 className='font-content'>{album.name}</h1>
      </div>
    </div>
  )
}

export default Album