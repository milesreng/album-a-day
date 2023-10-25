/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { useState, useEffect } from 'react'
import Header from './Header'
import Track from './Track'

const Dashboard = (props) => {
  const [user, setUser] = useState()
  const [timeRange, setTimeRange] = useState('short')
  const [tracks, setTracks] = useState([])
  const [tileLayout, setTileLayout] = useState(false)

  const access_token = props.token

  useEffect(() => {
    const authParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token
      }
    }

    async function fetchData () {
      const user = await fetch('https://api.spotify.com/v1/me', authParameters)
      .then(response => response.json())

      setUser(user)
    }

    fetchData()
  }, [access_token])

  const getTopTracks = async (time) => {
    const searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token
      }
    }

    const topTracks = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${time}_term&limit=50`,
      searchParameters)
      .then(response => response.json())
      .then(data => {
        setTracks(data.items)
        console.log(tracks)
      })
  }

  const handleShortTerm = () => {
    if (timeRange !== 'short') {
      setTimeRange('short')
      console.log('changed to short range')
      getTopTracks('short')
    }
  }

  const handleMidTerm = () => {
    if (timeRange !== 'medium') {
      setTimeRange('medium')
      console.log('changed to medium range')
      getTopTracks('medium')
    }
  }

  const handleLongTerm = () => {
    if (timeRange !== 'long') {
      setTimeRange('long')
      console.log('changed to long range')
      getTopTracks('long')
    }
  }

  const handleSwitchLayout = () => {
    setTileLayout(!tileLayout)
  }

  return (
    <div className='w-full bg-gunmetal-900'>
      {user && (
        <Header user={user} />
      )}
      <div className='flex flex-col'>
        {/* <button className={`mx-auto  px-4 py-1 rounded-sm text-gunmetal ${timeRange === 'short' ? 'bg-gunmetal-50' : 'bg-gunmetal-200'}`}
          onClick={() => getTopTracks(timeRange)}>
            get top tracks
        </button> */}
        <div className='flex flex-row gap-4 mx-auto w-5/6 md:w-1/2'>
          <button onClick={handleShortTerm}
            className={`hover:bg-gunmetal-500 duration-400 transition-colors py-2 basis-1/3 ${timeRange === 'short' ? 'bg-gunmetal' : 'bg-gunmetal-800'}`}>
            last 4 weeks
          </button>
          <button onClick={handleMidTerm}
            className={`hover:bg-gunmetal-500 duration-400 transition-colors py-2 basis-1/3 ${timeRange === 'medium' ? 'bg-gunmetal' : 'bg-gunmetal-800'}`}>
            last 6 months
          </button>
          <button onClick={handleLongTerm}
            className={`hover:bg-gunmetal-500 duration-400 transition-colors py-2 basis-1/3 ${timeRange === 'long' ? 'bg-gunmetal' : 'bg-gunmetal-800'}`}>
            all time
          </button>
        </div>
        {/* <div className='flex-row mx-auto py-4  w-5/6 md:w-1/2 justify-end hidden md:flex'>
          <label className='flex cursor-pointer select-none'>
            <div className='relative'>
              <input
                type='checkbox'
                checked={tileLayout}
                onChange={handleSwitchLayout}
                className='sr-only'
                />
              <div
                className={`box block h-6 w-10 rounded-full ${
                  tileLayout ? 'bg-default-bg' : 'bg-gunmetal-500'
                }`}>
              </div>
              <div
                className={`absolute left-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-bluegray transition ${
                  tileLayout ? 'translate-x-full' : ''
              }`}>
              </div>
            </div>
          </label>
          <div className='my-auto pl-4'>
            {tileLayout ? <FaBorderAll /> : <FaList /> }
          </div>
        </div> */}
        <div className='flex flex-col w-full mx-auto pt-4 bg-gunmetal'>
          {tracks && tracks.map((track, idx) => (
            <Track
            key={track.id}
            rank={idx+1}
            url={track.uri}
            name={track.name}
            img={track.album.images[0].url}
            artists={track.artists} />
          ))}
        </div>
      </div>
      {/* <Search token={access_token} /> */}
    </div>
  )
}

export default Dashboard