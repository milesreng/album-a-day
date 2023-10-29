/* eslint-disable react/prop-types */
import React from 'react'

const TrackThin = ({ track, rank }) => {
  return (
    <div className='w-5/6 mx-auto border-b border-gunmetal-400 py-2 md:py-4 hover:bg-gunmetal-700 font-content'>
      <div className='flex flex-row gap-4'>
        <div className='my-auto basis-1/12'>
          <p>{rank+1}</p>
        </div>
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
      {/* <div className='flex flex-row h-full gap-4'>
        <p className='my-auto text-md md:text-xl basis-1/12'>{rank+1}</p>
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
      </div> */}
    </div>
  )
}

export default TrackThin