/* eslint-disable react/prop-types */
import React from 'react'

const RecommendedTrack = ({ track }) => {
  return (
    <div className='w-full mx-auto border-b border-gunmetal-400 py-2 md:py-4 hover:bg-gunmetal-700 font-content'>
      <div className='flex flex-row gap-4 w-full'>
        <div className='basis-1/6 aspect-square my-auto'>
          <img className='w-full aspect-square'
            src={track.album.images[0].url} alt="" />
        </div>
        <div className='basis-2/3'>
          <h1 className='uppercase text-xs sm:text-sm md:text-lg'>{track.name}</h1>
          <div className='text-xs md:text-sm font-thin'>
              {track.artists.map((artist, idx) => (
                <span key={artist.id} className=''>
                  {artist.name}{idx === track.artists.length - 1 ? '' : ', '}
                </span>
              ))}
            </div>
        </div>
      </div>
    </div>
  )
}

export default RecommendedTrack