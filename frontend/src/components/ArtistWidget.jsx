/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'

const ArtistWidget = ({ artist, rank }) => {
  return (
    <div className='flex flex-row basis-1/2 md:basis-1/4 gap-2 text-sm text-center mx-auto'>
      <div className='my-auto mx-auto'>
      {rank+2}. {artist.name}
      {/* <div className='basis-1/4'>
      <img className='overflow-hidden w-full'
        src={artist.images[0].url} alt="" />
      </div> */}
      </div>
    </div>
  )
}

export default ArtistWidget