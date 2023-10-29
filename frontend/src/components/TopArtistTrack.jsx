/* eslint-disable react/prop-types */
import React from 'react'

const TopArtistTrack = ({ track }) => {
  return (
    <div className='flex flex-row'>
      <div className='h-full w-32'>
        <img className='w-32'
          src={track.album.images[0].url} alt="" />
      </div>
      <p className='-rotate-90'>
        {track.name}
      </p>
    </div>
  )
}

export default TopArtistTrack