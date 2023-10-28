import React from 'react'
import { useState, useEffect } from 'react'
import Artist from './Artist'
import Loader from './Loader'

const ArtistsWrapped = ({ token, time_range }) => {
  const [loading, setLoading] = useState(false)
  const [artists, setArtists] = useState([])

  useEffect(() => {
    setLoading(true)
    const authParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }

    async function fetchData () {
      const data = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${time_range}_term&limit=50`, authParameters)
        .then(response => response.json())

      setArtists(data.items)
      // console.log(artist)
    }
    
    fetchData()
    setLoading(false)
  }, [token, time_range])

  return (
    <div className='flex flex-wrap mx-auto bg-gunmetal-700 px-8 pb-8 w-5/6 gap-4 md:w-2/3 justify-start'>
      {loading && <Loader />}
      {artists && artists.map((artist, idx) => (
        <Artist key={artist.id} artist={artist} rank={idx} />
      ))}
    </div>
  )
}


export default ArtistsWrapped