/* eslint-disable react/prop-types */
import React from 'react'

const Track = (props) => {
  return (
    <div className='w-5/6 md:w-3/4 mx-auto border-b border-gunmetal-400 pb-8'>
      <div className='flex flex-row h-full gap-4'>
        <p className='my-auto text-xl basis-1/12'>{props.rank}</p>
        <div className='overflow-hidden basis-1/6'>
          <img className=''
          src={props.img} alt={props.name} />
        </div>
        <div className='text-left flex flex-col gap-2'>
          <p className='uppercase'>{props.name}</p>
          <div>
            {props.artists.map((artist, idx) => (
              <span key={artist.id}>
                {artist.name}{idx === props.artists.length - 1 ? '' : ', '}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Track