/* eslint-disable react/prop-types */
import React from 'react'
import Avatar from '../assets/avatar.jpg'

const Artist = ({ artist, rank }) => {
  console.log(artist)
  return (
    <a href={artist.external_urls.spotify} 
      className='flex flex-col basis-1/6 mx-auto hover:bg-gunmetal-500 pt-2 font-content text-sm font-thin'>
      <div className='w-32 h-32 overflow-hidden mx-auto'>
        <img className='w-full h-full'
          src={artist.images.length > 0 ? artist.images[0].url : 'https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg'} alt={artist.name} />
      </div>
      <div className='text-center pt-2'>
        {rank+1}. {artist.name}
      </div>
    </a>
  )
}

export default Artist