import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='font-sans h-screen bg-gunmetal-900 text-default-bg'>
      {/* <Header /> */}
      <div className=''>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default App