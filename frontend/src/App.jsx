import React from 'react'
import { Outlet } from 'react-router'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='font-sans h-full bg-gunmetal-900 text-default-bg'>
      <div className='h-full bg-gunmetal-900'>
        <Outlet />
      </div>
    </div>
  )
}

export default App