import React from 'react'
import { Outlet } from 'react-router'
import Footer from './components/Footer'



const App = () => {
  return (
    <div className='font-sans h-screen bg-gunmetal-900 text-default-bg'>
      <div className='h-full bg-gunmetal-900'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default App