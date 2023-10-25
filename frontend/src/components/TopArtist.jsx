/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { useState, useEffect } from 'react'
import TrackWidget from './TrackWidget'

const TopArtist = (props) => {
  const [artist, setArtist] = useState()
  const [artistTracks, setArtistTracks] = useState([])
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
      const artist = await fetch('https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=1', authParameters)
      .then(response => response.json())

      setArtist(artist.items[0])
      // console.log(artist)
    }
    
    fetchData()
    getTopByArtist()
  }, [access_token])

  const getTopByArtist = async () => {
    const searchParameters = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + access_token
        }
      }
  
      const topTracks = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=50`,
        searchParameters)
        .then(response => response.json())
        .then(data => {
          setArtistTracks(data.items)
      })

    
  }

  return (
    <div>
      {artist && (
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col bg-default-bg w-1/2 md:w-1/3 mx-auto px-8 pt-4'>
            <img className='mx-auto'
              src={artist.images[0].url} alt={artist.name} />
            <p className='text-gunmetal py-6 text-2xl'>{artist.name}</p>
          </div>
          <button onClick={getTopByArtist}>your favorite tracks by {artist.name}:</button>
          <div className='flex flex-wrap mx-auto w-11/12 justify-between'>
            {artistTracks && artistTracks.filter(track => track.artists.find(a => a.name === artist.name)).slice(0, 10).map((track, idx) => (
              <TrackWidget key={track.id} track={track} artistID={artist.id} rank={idx+1} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default TopArtist