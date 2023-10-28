/* eslint-disable react/prop-types */
import React from 'react'

const RecommendedTrack = ({ track }) => {
  return (
    <a href={track.external_urls.spotify} 
      className='sm:basis-1/4 md:basis-1/6 flex flex-col gap-1 font-content'>
      <div className='w-50 md:w-40'>
        <img className='overflow-hidden'
        src={track.album.images[0].url} alt="" />
      </div>
      <div>
        <p className='text-xs truncate w-40'>{track.name}</p>
        <p className='text-xs truncate w-40'>{track.artists[0].name}</p>
      </div>
    </a>
  )
}

export default RecommendedTrack