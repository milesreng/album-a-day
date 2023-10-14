import React from 'react'
import RecordSpinner from '../components/RecordSpinner'

const HomeScreen = () => {
  return (
    <div className='w-full flex flex-col justify-around h-screen text-center'>
      <div className='h-screen flex flex-col justify-center gap-12 text-gunmetal-50'>
        <RecordSpinner />
        <div className='flex flex-col gap-4'>
          <h1 className='text-4xl'>Welcome to <span className='uppercase font-bold'>album a day</span></h1>
          <div className='flex flex-row w-full justify-center gap-8 md:gap-24 text-lg'>
            <button className=' rounded-md border-2 border-gunmetal-900 bg-gunmetal-50 text-gunmetal-900 px-8 text-center hover:bg-gunmetal-100 transition-colors duration-300'>Register</button>
            <button className=' rounded-md border-2 bg-gunmetal-800 border-gunmetal-50 text-gunmetal-50 px-8 text-center hover:bg-gunmetal-500 transition-colors duration-300'>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeScreen