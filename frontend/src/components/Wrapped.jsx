/* eslint-disable react/prop-types */
import React from 'react'
import { useState, useEffect } from 'react'

import SpotifyLogo from '../assets/Spotify_Logo_RGB_Black.png'

const Wrapped = ({ accessToken, timeRange }) => {

  const [shortTracks, setShortTracks] = useState()
  const [shortArtists, setShortArtists] = useState()
  const [shortGenre, setShortGenre] = useState()

  const [mediumTracks, setMediumTracks] = useState()
  const [mediumArtists, setMediumArtists] = useState()
  const [mediumGenre, setMediumGenre] = useState()

  const [longTracks, setLongTracks] = useState()
  const [longArtists, setLongArtists] = useState()
  const [longGenre, setLongGenre] = useState()

  const [day, setDay] = useState()
  const [startMonth, setStartMonth] = useState()
  const [lastMonth, setLastMonth] = useState()
  const [endMonth, setEndMonth] = useState()
  const [year, setYear] = useState()

  const authParameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    }
  }


  useEffect(() => {

    const fetchData = async () => {

      const stracks = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10`, authParameters)
      .then(response => response.json())
      .catch(error => console.log(error.message))

      setShortTracks(stracks.items)

      const mtracks = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10`, authParameters)
      .then(response => response.json())
      .catch(error => console.log(error.message))

      setMediumTracks(mtracks.items)

      const ltracks = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10`, authParameters)
      .then(response => response.json())
      .catch(error => console.log(error.message))

      setLongTracks(ltracks.items)

      const sartists = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=20`, authParameters)
      .then(response => response.json())
      .catch(error => console.log(error.message))

      setShortArtists(sartists.items)
      setShortGenre(getTopGenres(sartists.items))

      const martists = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=20`, authParameters)
      .then(response => response.json())
      .catch(error => console.log(error.message))

      setMediumArtists(martists.items)
      setMediumGenre(getTopGenres(martists.items))

      const lartists = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=20`, authParameters)
      .then(response => response.json())
      .catch(error => console.log(error.message))

      setLongArtists(lartists.items)
      setLongGenre(getTopGenres(lartists.items))
    }

    if (timeRange) {
      fetchData()
    }
  }, [])

  useEffect(() => {
    const getCurrentDate = () => {
      const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    

      let today = new Date()
      setEndMonth(months[today.getMonth()])
  
      if (today.getMonth() >= 6) {
        setStartMonth(months[today.getMonth() - 6])
      } else {
        setStartMonth(months[today.getMonth() + 6])
      }
  
      if (today.getMonth() === 0) {
        setLastMonth(months[12])
      } else {
        setLastMonth(months[today.getMonth() - 1])
      }
  
      setDay(today.getDate())
      setYear(today.getFullYear())
    }

    getCurrentDate()

  }, [])

  const getTopGenres = (artists) => {
    let genres = new Map()
  
      for (let i = 0; i < (artists.length > 10 ? 10 : artists.length); i++) {
        for (let j = 0; j < artists[i].genres.length; j++) {
          if (!genres.has(artists[i].genres[j])) {
            genres.set(artists[i].genres[j], 0)
          }
          genres.set(artists[i].genres[j], genres.get(artists[i].genres[j]) + 1)
        }
      }
  
      let topGenre = ''
      let topCount = 0
      for (let [key, value] of genres) {
        if (value > topCount) {
          topGenre = key
          topCount = value
        }
      }

    return topGenre
  }


  return (
    <div className={`w-[400px] mx-auto flex flex-col font-header justify-between px-4 text-md shadow-lg`}>
      {shortArtists && (<><div className='text-3xl font-header uppercase text-center py-4 font-bold'>
        {timeRange === 'short' && endMonth && (
          <div>{day >= 15 ? endMonth : lastMonth.slice(0, 3) + ' - ' + endMonth.slice(0, 3)} Wrapped</div>
        )}
        {timeRange === 'medium' && startMonth && (
          <div>{startMonth.slice(0, 3)} - {endMonth.slice(0, 3)} Wrapped</div>
        )}
        {timeRange === 'long' && (
          <div>All Time Wrapped</div>
        )}
      </div><div className='flex flex-row pb-2'>
          <div className='flex flex-col w-[160px] aspect-square justify-between'>
            <div className='aspect-square w-42'>
              {timeRange === 'short' && <img src={shortArtists[0].images[0].url} alt="" />}
              {timeRange === 'medium' && <img src={mediumArtists[0].images[0].url} alt="" />}
              {timeRange === 'long' && <img src={longArtists[0].images[0].url} alt="" />}
            </div>
            <div className='flex flex-col justify-between gap-2'>
              <div>
                <h1 className='text-lg'>Top Genre</h1>
                <p className='font-bold text-3xl'>
                  {timeRange === 'short' && shortGenre}
                  {timeRange === 'medium' && mediumGenre}
                  {timeRange === 'long' && longGenre}
                </p>
              </div>
              <div>
                <h1 className='text-lg'>Filler Stat</h1>
                <p className='font-bold text-3xl'>52,515</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col w-[190px] pl-4'>
            <div className='w-full'>
              <h1 className='font-header font-bold text-2xl'>Top Artists</h1>
              {timeRange === 'short' && shortArtists.slice(0, 5).map(artist => (
                <div className='font-thin truncate text-ellipsis' key={artist.id}>
                  <a className='hover:text-gunmetal-500'
                    href={artist.external_urls.spotify} target='_blank' rel='noreferrer'>
                    {artist.name}
                  </a>
                </div>
              ))}
              {timeRange === 'medium' && mediumArtists.slice(0, 5).map(artist => (
                <div className='font-thin truncate text-ellipsis' key={artist.id}>
                  <a className='hover:text-gunmetal-500'
                    href={artist.external_urls.spotify} target='_blank' rel='noreferrer'>
                    {artist.name}
                  </a>
                </div>
              ))}
              {timeRange === 'long' && longArtists.slice(0, 5).map(artist => (
                <div className='font-thin truncate text-ellipsis' key={artist.id}>
                  <a className='hover:text-gunmetal-500'
                    href={artist.external_urls.spotify} target='_blank' rel='noreferrer'>
                    {artist.name}
                  </a>
                </div>
              ))}
            </div>
            <div className='w-full'>
              <h1 className='font-header font-bold text-2xl'>Top Tracks</h1>
              {timeRange === 'short' && shortTracks.slice(0, 5).map(track => (
                <div className='font-thin truncate text-ellipsis' key={track.id}>
                  <a className='hover:text-gunmetal-500'
                    href={track.external_urls.spotify} target='_blank' rel='noreferrer'>
                    {track.name}
                  </a>
                </div>
              ))}
              {timeRange === 'medium' && mediumTracks.slice(0, 5).map(track => (
                <div className='font-thin truncate text-ellipsis' key={track.id}>
                  <a className='hover:text-gunmetal-500'
                    href={track.external_urls.spotify} target='_blank' rel='noreferrer'>
                    {track.name}
                  </a>
                </div>
              ))}
              {timeRange === 'long' && longTracks.slice(0, 5).map(track => (
                <div className='font-thin truncate text-ellipsis' key={track.id}>
                  <a className='hover:text-gunmetal-500'
                    href={track.external_urls.spotify} target='_blank' rel='noreferrer'>
                    {track.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
          
        </div></>)}
       {shortArtists && 
       <div className='w-full flex flex-row justify-between border-t border-gunmetal-50 py-2'>
       <div className='w-16 aspect-auto my-auto'>
         <img className='overflow-hidden'
         src={SpotifyLogo} alt='spotify logo' />
       </div>
          <a className='text-center underline text-[10px] md:text-xs'
            href='https://wrappedpreview.netlify.app'>
              https://wrappedpreview.netlify.app
          </a>
       </div>}
    </div>
  )
}

export default Wrapped