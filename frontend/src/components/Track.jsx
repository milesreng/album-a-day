import React from 'react'

const Track = ({ accessToken, track, rank }) => {

  return (
    <div className='border-b py-2 border-gunmetal-400 flex flex-row w-full h-16 text-gunmetal dark:text-default-bg'>
      <div className='h-full flex flex-col justify-around w-12'>
        <p className='px-4'>{rank + 1}</p>
      </div>
      <div className='h-full aspect-square w-1/6 md:w-1/12'>
        <img className='h-full overflow-hidden'
           src={track.album.images[0].url} alt="" />
      </div>
      <a href={track.external_urls.spotify} target='_blank' rel='noreferrer'
        className='w-2/3 h-full flex flex-col justify-evenly pl-4'>
        <span className='text-xs sm:text-sm md:text-md truncate text-ellipsis w-5/6'>
          {track.name}
        </span>
        <span className='text-[10px] sm:text-xs md:text-sm'>
        {track.artists.map((artist, idx) => (
          <span key={artist.id}>
            {artist.name}
            {idx === track.artists.length - 1 ? '' : ', '}
          </span>
        ))}
        </span>
      </a>
    </div>
  )
}

export default Track