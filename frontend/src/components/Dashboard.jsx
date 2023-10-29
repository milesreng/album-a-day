import React from 'react'
import { useState, useEffect } from 'react'

import Header from './Header'
import Lineup from './Lineup'

const Dashboard = ({ accessToken }) => {
  const [user, setUser] = useState()
  const [timeRange, setTimeRange] = useState()
  const [artists, setArtists] = useState()
  const [bgType, setBgType] = useState()

  useEffect(() => {
    const authParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }

    async function fetchData () {
      const user = await fetch('https://api.spotify.com/v1/me', authParameters)
      .then(response => response.json())
      .catch(error => console.log(error.message))

      setUser(user)

      const artists = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange || 'short'}_term&limit=30`, authParameters)
      .then(response => response.json())
      .catch(error => console.log('error'))

      setArtists(artists.items)
    }

    fetchData()
  }, [timeRange])

  const handleSetShort = () => {
    setTimeRange('short')
  }

  const handleSetMed = () => {
    setTimeRange('medium')
  }

  const handleSetLong = () => {
    setTimeRange('long')
  }

  const handleSetDefault = () => {
    setBgType('default')
  }

  const handleSetRetro = () => {
    setBgType('retro')
  }

  return (
    <div className='h-full w-full'>
      { user && <Header user={user} />}
      <div className='flex flex-row w-1/2 mx-auto justify-evenly my-4'>
        <button onClick={handleSetShort}
          className={`basis-1/4 px-4 py-1 rounded-lg ${(timeRange === 'short' || !timeRange) ? 'bg-gunmetal-700' : 'bg-gunmetal-900'}`}>
          last 4 weeks
        </button>
        <button onClick={handleSetMed}
          className={`basis-1/4 px-4 py-1 rounded-lg ${(timeRange === 'medium' || !timeRange) ? 'bg-gunmetal-700' : 'bg-gunmetal-900'}`}>
          last 6 months
        </button>
        <button onClick={handleSetLong}
          className={`basis-1/4 px-4 py-1 rounded-lg ${(timeRange === 'long' || !timeRange) ? 'bg-gunmetal-700' : 'bg-gunmetal-900'}`}>
          all time
        </button>
      </div>
      <div>
        <div>
          <button onClick={handleSetDefault}>default</button>
          <button onClick={handleSetRetro}>retro</button>
        </div>
        { artists && <Lineup user={user} artists={artists} type={bgType || 'default'} />}
      </div>
    </div>
  )
}

export default Dashboard