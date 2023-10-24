import React from 'react'
import Record from '/images/cd-gunmetal-50.svg'

const RecordSpinner = () => {
  return (
      <img src={Record} alt='record spinning slowly'
        className='h-1/2 align-[-0.125em] animate-[spin_10s_linear_infinite] mx-auto border-8 border-gunmetal-100 rounded-full' />
  )
}

export default RecordSpinner