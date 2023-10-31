import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

import Header from '../components/Header'
import Track from '../components/Track'

const TracksScreen = () => {
  const navigate = useNavigate()

  const [accessToken, setAccessToken] = useState()
  
  const [timeRange, setTimeRange] = useState()
  const [user, setUser] = useState()
  const [tracks, setTracks] = useState()


  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      setAccessToken(localStorage.getItem('access_token'))
    } else {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    const authParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }

    const fetchData = async () => {
      const user = await fetch('https://api.spotify.com/v1/me', authParameters)
      .then(response => response.json())
      .catch(error => console.log(error.message))

      setUser(user)

      const tracks = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange || 'short'}_term&limit=50`, authParameters)
      .then(response => response.json())
      .catch(error => console.log(error.message))

      setTracks(tracks.items)

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
    <div className='w-full flex flex-col gap-4 bg-default-bg dark:bg-gunmetal'>
      {user && <Header user={user} />}
      <div className='flex flex-col w-5/6 md:w-2/3 lg:w-1/2 mx-auto'>
        <div className='flex flex-row text-gunmetal justify-between w-full text-xs'>
          <button className={`rounded-t-md py-1 basis-1/3 text-gunmetal dark:text-default-bg ${(timeRange !== 'short' && timeRange) ? 'bg-default-bg dark:bg-gunmetal' : 'bg-gunmetal-50 dark:bg-gunmetal-500'}`}
            onClick={handleSetShort}>
            last 4 weeks
          </button>
          <button className={`rounded-t-md py-1 basis-1/3 text-gunmetal dark:text-default-bg ${timeRange !== 'medium' ? 'bg-default-bg dark:bg-gunmetal' : 'bg-gunmetal-100 dark:bg-gunmetal-500'}`}
            onClick={handleSetMedium}>
            last 6 months
          </button>
          <button  className={`rounded-t-md py-1 basis-1/3 text-gunmetal dark:text-default-bg ${timeRange !== 'long' ? 'bg-default-bg dark:bg-gunmetal' : 'bg-gunmetal-100 dark:bg-gunmetal-500'}`}
            onClick={handleSetLong}>
            all time
          </button>
        </div>
        <div className='w-full flex flex-col bg-default-bg shadow-xl dark:bg-gunmetal text-gunmetal'>
        {tracks && tracks.map((track, idx) => (
          <Track key={idx} accessToken={accessToken} track={track} rank={idx} />
        ))}
        </div>
      </div>
    </div>
  )
}

export default TracksScreen