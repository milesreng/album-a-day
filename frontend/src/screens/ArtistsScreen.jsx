import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

import Header from '../components/Header'
import Artist from '../components/Artist'

const ArtistsScreen = () => {

  const navigate = useNavigate()

  const [accessToken, setAccessToken] = useState()
  
  const [timeRange, setTimeRange] = useState()
  const [user, setUser] = useState()
  const [artists, setArtists] = useState()

  const [hasName, setHasName] = useState()


  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      setAccessToken(localStorage.getItem('access_token'))
    } else {
      navigate('/')
    }

    setHasName(true)
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

      const artists = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange || 'short'}_term&limit=50`, authParameters)
      .then(response => response.json())
      .catch(error => console.log(error.message))

      setArtists(artists.items)

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

  const handleSetName = () => {
    setHasName(!hasName)
  }

  return (
    <div className='w-full flex flex-col'>
      {user && <Header user={user} />}
      <button className='pb-4 dark:text-default-bg text-xs underline'
       onClick={handleSetName}>
        {hasName ? 'hide ' : 'see'} artist names
      </button>
      <div className='flex flex-col w-5/6 md:w-2/3 lg:w-1/2 mx-auto'>
        <div className='flex flex-row text-gunmetal justify-between w-full text-xs'>
          <button className={`rounded-t-md border-t border-r border-l border-default-bg dark:border-gunmetal hover:dark:border-default-bg hover:border-gunmetal py-1 basis-1/3 text-gunmetal dark:text-default-bg ${(timeRange !== 'short' && timeRange) ? 'bg-default-bg dark:bg-gunmetal' : 'bg-gunmetal-50 dark:bg-gunmetal-500'}`}
            onClick={handleSetShort}>
            last 4 weeks
          </button>
          <button className={`rounded-t-md border-t border-r border-l border-default-bg dark:border-gunmetal hover:dark:border-default-bg hover:border-gunmetal py-1 basis-1/3 text-gunmetal dark:text-default-bg ${(timeRange !== 'medium' && timeRange) ? 'bg-default-bg dark:bg-gunmetal' : 'bg-gunmetal-50 dark:bg-gunmetal-500'}`}
            onClick={handleSetMedium}>
            last 6 months
          </button>
          <button  className={`rounded-t-md border-t border-r border-l border-default-bg dark:border-gunmetal hover:dark:border-default-bg hover:border-gunmetal  py-1 basis-1/3 text-gunmetal dark:text-default-bg ${(timeRange !== 'long' && timeRange) ? 'bg-default-bg dark:bg-gunmetal' : 'bg-gunmetal-50 dark:bg-gunmetal-500'}`}
            onClick={handleSetLong}>
            all time
          </button>
        </div>
        <div className='w-full flex flex-wrap bg-default-bg text-gunmetal dark:bg-gunmetal dark:text-default-bg p-2 justify-evenly md:justify-between gap-4'>
        {artists && artists.map((artist, idx) => (
          <Artist key={idx} accessToken={accessToken} artist={artist} rank={idx} hasName={hasName} />
        ))}
        </div>
      </div>
    </div>
  )
}

export default ArtistsScreen