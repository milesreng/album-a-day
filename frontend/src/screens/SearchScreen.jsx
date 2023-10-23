import React from 'react'
import { useState, useEffect } from 'react'
import Album from '../components/Album'
import AlbumTile from '../components/AlbumTile'
import { FaBorderAll, FaList, FaSearch } from 'react-icons/fa'

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET

const SearchScreen = () => {
  const [accessToken, setAccessToken] = useState('')
  const [search, setSearch] = useState('')
  const [tileLayout, setTileLayout] = useState(true)
  const [albums, setAlbums] = useState([])

  useEffect(() => {
    const authParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    }
    fetch('https://accounts.spotify.com/api/token', authParams)
      .then(res => res.json())
      .then(data => setAccessToken(data.access_token))
  }, [])

  const handleSearch = async () => {
    console.log('search for ' + search)

    if (search === '') {
      return
    }

    // GET artist ID
    const searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }
    const artistID = await fetch(`https://api.spotify.com/v1/search?q=${search}&type=artist`, searchParameters)
      .then(response => response.json())
      .then(data => { 
        return data.artists.items[0].id
      })

    console.log(`artist ID is ${artistID}`)
    // GET all albums w/ artist ID

    const retAlbums = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums?&include_groups=album&market=US&limit=50`, searchParameters)
      .then(response => response.json())
      .then(data => {
        setAlbums(data.items)
      })

    setSearch('')
  }

  const handleSearchChange = async (e) => {
    setSearch(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key == 'Enter') {
      handleSearch()
    }
  }

  const handleSwitchLayout = () => {
    setTileLayout(!tileLayout)
  }

  return (
    <div className='flex flex-col w-full bg-gunmetal-900 min-h-screen'>
      <div className='w-11/12 md:w-3/4 flex-col flex mx-auto '>
        <div className='w-full md:w-11/12 flex flex-row mx-auto justify-around pt-2 md:pt-12 font-content'>
          <input type='text' 
            placeholder='search for artist' 
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            value={search}
            className='basis-11/12 rounded-l-md p-1 my-auto text-gunmetal-900 pl-2' />
          <button onClick={handleSearch}
            className='font-content bg-default-bg basis-1/12 text-center px-2 text-gunmetal-900 rounded-r-md py-auto hover:bg-gunmetal-50 transition-colors duration-400'>
            <FaSearch className='mx-auto' />
          </button>
        </div>
        <div className='w-11/12 flex flex-row mx-auto py-4 justify-end'>
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
                <div className='my-auto ml-2'>
                {tileLayout ? <FaBorderAll /> : <FaList /> }
                </div>
        </div>
        <div className={`flex justify-around gap-4 w-full ${tileLayout ? 'flex-wrap' : 'flex-col'}`}>
         { albums.map((album, i) => {
            if (tileLayout) {
              return (<AlbumTile key={i} album={album} />)
            } else {
              return (<Album key={i} album={album} />)
            }
          })
         }
        </div>
      </div>
    </div>
    
  )
}

export default SearchScreen