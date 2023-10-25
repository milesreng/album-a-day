/* eslint-disable react/prop-types */
import React from 'react'
import { useState, useEffect } from 'react'
import Header from './Header'
import Search from './Search'
import Track from './Track'

const Dashboard = (props) => {
  const [user, setUser] = useState()
  const [timeRange, setTimeRange] = useState('short')
  const [tracks, setTracks] = useState([])
  const [artists, setArtists] = useState([])

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

  }, [])

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

  return (
    <div className='w-full'>
      {user && (
        <Header 
          img={user.images[0].url} 
          name={user.display_name}
          username={user.id}
          url={user.external_urls.spotify} />
      )}
      <div className='flex flex-col gap-4'>
        <button className={`mx-auto  px-4 py-1 rounded-sm text-gunmetal ${timeRange === 'short' ? 'bg-gunmetal-50' : 'bg-gunmetal-200'}`}
          onClick={() => getTopTracks(timeRange)}>
            get top tracks
        </button>
        <div className='flex flex-row gap-4 mx-auto w-5/6 md:w-1/2'>
          <button onClick={handleShortTerm}
            className='hover:bg-gunmetal-500 duration-400 transition-colors py-1 basis-1/3'>
            last 4 weeks
          </button>
          <button onClick={handleMidTerm}
            className='hover:bg-gunmetal-500 duration-400 transition-colors py-1 basis-1/3'>
            last 6 months
          </button>
          <button onClick={handleLongTerm}
            className='hover:bg-gunmetal-500 duration-400 transition-colors py-1 basis-1/3'>
            all time
          </button>
        </div>
        <div className='flex flex-col w-full gap-8 pt-4'>
          {tracks && tracks.map((track, idx) => (
            <Track
            key={track.id}
            rank={idx+1}
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