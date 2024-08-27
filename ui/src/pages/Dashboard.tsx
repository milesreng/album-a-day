import React from 'react'

const Dashboard = () => {
  return (
    <div className='w-5/6 mx-auto my-auto py-4 flex flex-col gap-4 justify-center'>
      <div className='w-1/3 aspect-square border-2 border-stone-500 mx-auto'>

      </div>
      <div className='mx-auto flex flex-row w-1/3 justify-between'>
        <span className='border px-6 uppercase border-stone-400 hover:cursor-pointer hover:bg-stone-100'>
          randomize
        </span>
        <span className='border px-6 uppercase border-stone-400 hover:cursor-pointer hover:bg-stone-100'>
          save
        </span>
      </div>
    </div>
  )
}

export default Dashboard