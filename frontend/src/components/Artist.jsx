import React from 'react'
import Avatar from '../assets/avatar.jpg'

const Artist = ({ accessToken, artist, rank, hasName }) => {
  return (
    <div className='flex flex-col w-11/12 sm:w-1/3 md:w-1/6'>
      <div className='basis-1/3 aspect-square md:basis-1/6'>
        <img className='aspect-square overflow-hidden'
          src={artist.images[0] ? artist.images[0].url : Avatar} alt="" />
      </div>
      {hasName && (<div className='text-[14px] pt-2 sm:text-xs text-center truncate text-ellipsis'> 
        {rank+1}. {artist.name}
      </div>)}
    </div>
  )
}

export default Artist