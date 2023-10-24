import React from 'react'
import Record from '/images/cd-bluegray.svg'

const Loader = () => {
  return (
    <div className='w-full flex flex-row justify-around'>
      <img src={Record} alt='record spinning slowly'
        className='h-1/2 align-[-0.125em] animate-[spin_10s_linear_infinite] mx-auto border-8 border-spotify-green rounded-full' />
      <span className='!absolute mx-auto !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
        Loading...</span>
    </div>
  )
}

export default Loader