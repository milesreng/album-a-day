import React from 'react'
import { useState, useEffect } from 'react'
import { redirect } from 'react-router'

import Header from '../components/Header'
import Lineup from '../components/Lineup'

const LineupScreen = () => {
  const [accessToken, setAccessToken] = useState()
  const [user, setUser] = useState()
  const [artists, setArtists] = useState()
  const [timeRange, setTimeRange] = useState()

  useEffect(() => {
    setAccessToken(localStorage.getItem('access_token'))
    setTimeRange('short')
  }, [])

  useEffect(() => {

    const authParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }

    async function fetchData () {
      const artist = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange || 'short'}_term&limit=30`, authParameters)
      .then(response => response.json())

      if (!artist) {
        redirect('/')
      }

      setArtists(artist.items)

      const user = await fetch('https://api.spotify.com/v1/me', authParameters)
      .then(response => response.json())

      if (!user) {
        redirect('/')
      }
    
      setUser(user)
    }

    if (accessToken) {
      fetchData()
    }
  }, [accessToken, timeRange])

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
    <div className='min-h-screen bg-gunmetal flex flex-col w-full'>
      {user && <Header user={user} isLineup={true} />}
      <div className='w-11/12 md:w-1/2 flex flex-row justify-evenly mx-auto py-4'>
        <button onClick={handleSetShort}
          className={`px-4 py-1 rounded-md ${timeRange === 'short' ? 'bg-gunmetal-500': ''}`}>
          last 4 weeks
        </button>
        <button onClick={handleSetMedium}
          className={`px-4 py-1 rounded-md ${timeRange === 'medium' ? 'bg-gunmetal-500': ''}`}>
          last 6 months
        </button>
        <button  onClick={handleSetLong}
          className={`px-4 py-1 rounded-md ${timeRange === 'long' ? 'bg-gunmetal-500': ''}`}>
          all time
        </button>
      </div>
      {user && artists && (
        <Lineup user={user} artists={artists} />
      )}
    </div>
  )
}

export default LineupScreen