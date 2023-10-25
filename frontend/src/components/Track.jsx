/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import SpotifyLight from '../assets/spotify-light.svg'
import SpotifyHoverLight from '../assets/spotify-light-hover.svg'

const Track = ({ track, rank }) => {
  return (
    <div className='w-5/6 md:w-3/4 mx-auto border-b border-gunmetal-400 py-4 md:py-8 hover:bg-gunmetal-700 font-thin'>
      <div className='flex flex-row h-full gap-4'>
        <p className='my-auto text-md md:text-xl basis-1/12'>{rank+1}</p>
        <div className='overflow-hidden w-full h-full basis-1/2 md:basis-1/6'>
          <img className=''
          src={track.album.images[0].url} alt={track.name} />
        </div>
        <div
          className='text-left flex flex-col gap-2 hover:cursor-pointer basis-11/12 justify-between'>
          <div>
            <p className='uppercase text-md md:text-lg'>{track.name}</p>
            <div>
              {track.artists.map((artist, idx) => (
                <span key={artist.id} className='text-sm md:text-md'>
                  {artist.name}{idx === track.artists.length - 1 ? '' : ', '}
                </span>
              ))}
            </div>
          </div>
          <a href={track.external_urls.spotify}>
            <img className='w-4 md:w-5'
              src={SpotifyLight} alt='spotify logo' />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Track