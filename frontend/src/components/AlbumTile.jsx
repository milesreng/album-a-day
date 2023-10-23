/* eslint-disable react/prop-types */
import React from 'react'

const AlbumTile = ({ album }) => {
  return (
    <div className='basis-full sm:basis-1/3 md:basis-1/4 flex flex-col gap-1 pt-4 font-content'>
      <img src={album.images[0].url} alt={album.name} />
      <p>{album.name}</p>
    </div>
  )
}

export default AlbumTile