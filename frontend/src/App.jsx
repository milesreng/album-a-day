/* eslint-disable no-unused-vars */
import React from 'react'
import { Outlet } from 'react-router'

import { useState, useEffect } from 'react'

import DarkMode from './assets/dark-mode.svg'
import LightMode from './assets/light-mode.svg'

const App = () => {
  const [darkMode, setDarkMode] = useState()

  useEffect(() => {
    setDarkMode(false)
  }, [])

  const handleToggleMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={`font-sans flex flex-col h-full w-screen min-h-screen ${darkMode ? 'dark bg-gunmetal border-gunmetal-500' : 'bg-default-bg border-gunmetal'}`}>
      <button className='w-1/3 mx-auto py-2 border-b'
        onClick={handleToggleMode}>
        <img className='w-4 md:w-6 mx-auto'
          src={darkMode ? LightMode : DarkMode} alt="" />
      </button>
      <div className='h-full'>
        <Outlet />
      </div>
    </div>
  )
}

export default App