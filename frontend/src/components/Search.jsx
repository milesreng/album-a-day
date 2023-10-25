/* eslint-disable react/prop-types */
import React from 'react'
import { useState, useEffect } from 'react'

const Search = (props) => {
  const access_token = props.token 
  
  const [searchKey, setSearchKey] = useState()
  const [tracks, setTracks] = useState([])

  const handleSearch = async () => {
    console.log('search for ' + searchKey)

    if (searchKey === '') {
      return
    }

    // GET artist ID
    const searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token
      }
    }
    const artistID = await fetch(`https://api.spotify.com/v1/search?q=${searchKey}&type=artist`, searchParameters)
      .then(response => response.json())
      .then(data => { 
        return data.artists.items[0].id
      })

    console.log(`artist ID is ${artistID}`)
    // GET all albums w/ artist ID

    const retAlbums = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums?&include_groups=album&market=US&limit=50`, searchParameters)
      .then(response => response.json())
      .then(data => {
        setTracks(data.items)
      })

    setSearchKey('')
    console.log(tracks)
  }

  const handleEnter = (e) => {
    if (e.key == 'Enter') {
      handleSearch()
    }
  }

  return (
    <div>
      <div className='mx-auto w-1/2 flex flex-row justify-around my-auto pt-4'>
        <input
          className='text-gunmetal'
          type='text'
          placeholder='search for an artist...'
          onKeyDown={handleEnter}
          onChange={(e) => {setSearchKey(e.target.value)}}
        />
        <button onClick={handleSearch}>
          Search
        </button>
      </div>
      {tracks && tracks.map(track => (
        <div key={track.id}>
          {track.name}
        </div>
      ))}
    </div>
  )
}

export default Search