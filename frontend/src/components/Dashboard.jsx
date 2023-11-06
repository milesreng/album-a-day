import React from 'react'
import { useState, useEffect } from 'react'

import Header from './Header'
import Wrapped from './Wrapped'

const Dashboard = ({ accessToken }) => {

  const [user, setUser] = useState()
  const [artists, setArtists] = useState()
  const [tracks, setTracks] = useState()

  const [timeRange, setTimeRange] = useState()

  const authParameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    }
  }

  useEffect(() => {

    const fetchData = async () => {
      const user = await fetch('https://api.spotify.com/v1/me', authParameters)
      .then(response => response.json())
      .catch(error => console.log(error.message))

      setUser(user)


    }

    fetchData()

    setTimeRange('short')
  }, [])

  const handleSetShort = () => {
    setTimeRange('short')
  }

  const handleSetMedium = () => {
    setTimeRange('medium')
  }

  const handleSetLong = () => {
    setTimeRange('long')
  }

  return (
    <div className='h-full w-full'>
      { user && <Header user={user} />}
      <div className='w-3/4 md:w-1/3 mx-auto text-center flex flex-row justify-between font-content pb-4 text-xs md:text-sm'>
        <button onClick={handleSetShort}
          className='border-t border-b border-gunmetal px-2 md:px-4 hover:bg-gunmetal-50'>
          last 4 weeks
        </button>
        <button onClick={handleSetMedium}
          className='border-t border-b border-gunmetal px-2 md:px-4 hover:bg-gunmetal-50'>
          last 6 months
        </button>
        <button onClick={handleSetLong}
          className='border-t border-b border-gunmetal px-2 md:px-4 hover:bg-gunmetal-50'>
          all time
        </button>
      </div>
      {timeRange && (
        <Wrapped accessToken={accessToken} timeRange={timeRange} />
      )}
    </div>
  )
}

export default Dashboard