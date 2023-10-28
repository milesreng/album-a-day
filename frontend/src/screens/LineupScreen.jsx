import React from 'react'
import { useState, useEffect } from 'react'
import { redirect } from 'react-router'

import Header from '../components/Header'

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
  }, [accessToken])

  return (
    <div className='min-h-screen bg-gunmetal'>
      {user && <Header user={user} isLineup={true} />}
      {user && artists && (
      <div className='w-1/2 mx-auto'>
        <div>
          {artists[0].name}
        </div>
        <div>
          {artists.slice(1,11).map(artist => (
            <div key={artist.id}>
              {artist.name}
            </div>
          ))}
        </div>
      </div>)}
    </div>
  )
}

export default LineupScreen