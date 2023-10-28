/* eslint-disable react/prop-types */
import React from 'react'
import { useState, useEffect } from 'react'
import Loader from './Loader'
import Track from './Track'
import TrackThin from './TrackThin'

const TracksWrapped = ({ token, time_range }) => {
  const [tracks, setTracks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const authParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }

    async function fetchData () {
      setLoading(true)
      const data = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${time_range}_term&limit=50`, authParameters)
        .then(response => response.json())

      setTracks(data.items)
      // console.log(artist)
      setLoading(false)
    }
    
    fetchData()
  }, [token, time_range])


  return (
    <div className='bg-gunmetal-700 w-5/6 md:w-2/3 mx-auto'>
      {/* {tracks && !thinLayout && tracks.map((track, idx) => (
        <Track key={track.id} track={track} rank={idx} />
      ))} */}
      {tracks && tracks.map((track, idx) => (
          <TrackThin key={track.id} track={track} rank={idx} />
        ))}
    </div>
  )
}

export default TracksWrapped