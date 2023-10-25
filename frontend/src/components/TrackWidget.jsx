/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const TrackWidget = ({ track, artistID, rank }) => {
  return (
    <div className='basis-full md:basis-1/3 mx-auto md:pr-8'>
      <a href={track.external_urls.spotify} 
        className='flex flex-row gap-4 mb-6 shadow-lg bg-gunmetal-700 rounded-r-md mx-auto'>
        <div className='basis-1/4 md:basis-1/2 overflow-hidden rounded-l-md'>
          <img src={track.album.images[0].url} alt="" />
        </div>
        <div className='basis-3/4 flex flex-col text-left font-thin py-2 pr-2 justify-between'>
          <h1 className='text-xl md:text-lg uppercase'>{track.name}</h1>
          {/* {track.artists.filter(artist => artist.id !== artistID).map((artist, idx) => (
                <span key={artist.id} className='text-md'>
                  {artist.name}
                </span>
              ))} */}
        </div>
      </a>
    </div>
  )
}

export default TrackWidget