/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import SpotifyLight from '../assets/spotify-light.svg'
import SpotifyHoverLight from '../assets/spotify-light-hover.svg'

const Track = ({ track }) => {
  return (
    <div className='w-5/6 mx-auto border-b border-gunmetal-400 py-4 md:py-8 hover:bg-gunmetal-700'>
      <div className='flex flex-row h-full gap-4'>
        <div className='overflow-hidden w-full h-full basis-1/3 md:basis-1/6 my-auto'>
          <img className='w-full h-full'
          src={track.album.images[0].url} alt={track.name} />
        </div>
        <div
          className='text-left flex flex-col gap-2 hover:cursor-pointer basis-4/6 justify-between'>
          <div>
            <p className='uppercase text-md md:text-lg'>{track.name}</p>
            <div className='text-xs md:text-sm font-thin'>
              {track.artists.map((artist, idx) => (
                <span key={artist.id} className=''>
                  {artist.name}{idx === track.artists.length - 1 ? '' : ', '}
                </span>
              ))}
            </div>
          </div>
          <a href={track.external_urls.spotify}>
            <img className='w-4'
              src={SpotifyLight} alt='spotify logo' />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Track