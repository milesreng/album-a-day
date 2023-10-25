/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'

const Track = (props) => {
  return (
    <div className='w-5/6 md:w-3/4 mx-auto border-b border-gunmetal-400 py-8 hover:bg-gunmetal-700'>
      <div className='flex flex-row h-full gap-4'>
        <p className='my-auto text-xl basis-1/12'>{props.rank}</p>
        <div className='overflow-hidden w-36'>
          <img className=''
          src={props.img} alt={props.name} />
        </div>
        <a href={props.url}
          className='text-left flex flex-col gap-2 hover:cursor-pointer basis-11/12'>
          <p className='uppercase text-lg md:text-xl'>{props.name}</p>
          <div>
            {props.artists.map((artist, idx) => (
              <span key={artist.id} className='text-md md:text-lg'>
                {artist.name}{idx === props.artists.length - 1 ? '' : ', '}
              </span>
            ))}
          </div>
        </a>
      </div>
    </div>
  )
}

export default Track