/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useState, useEffect } from 'react'
import Header from './Header'
import PreviewWrapped from './PreviewWrapped'
import TracksWrapped from './TracksWrapped'
import ArtistsWrapped from './ArtistsWrapped'
import GenresWrapped from './GenresWrapped'

const Wrapped = (props) => {
  const [user, setUser] = useState()
  const [wrappedType, setWrappedType] = useState()
  const [timeRange, setTimeRange] = useState()

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
    setTimeRange('short')
  }, [access_token])

  const handleViewPreview = () => {
    setWrappedType('preview')
  }

  const handleViewTracks = () => {
    setWrappedType('tracks')
  } 

  const handleViewArtists = () => {
    setWrappedType('artists')
  } 
  
  const handleViewGenres = () => {
    setWrappedType('genres')
  }

  const handleViewShort = () => {
    setTimeRange('short')
  }

  const handleViewMid = () => {
    setTimeRange('medium')
  }

  const handleViewLong = () => {
    setTimeRange('long')
  }

  // const getWrapped = async () => {

  // }

  return (
    <div className='bg-gunmetal'>
      {user && <Header user={user} />}
      <div className='h-6 mb-4 md:px-4 text-sm flex flex-row mx-auto w-5/6 border-t border-b border-gunmetal-500 shadow-lg md:w-1/2 justify-between'>
        <button onClick={handleViewPreview}>
          <p className='px-4 md:px-8 hover:bg-gunmetal-500 transition-all duration-200 hover:cursor-pointer'>Preview</p>
        </button>
        <button onClick={handleViewTracks}>
          <p className='px-4 md:px-8 hover:bg-gunmetal-500 transition-all duration-200 hover:cursor-pointer'>Tracks</p>
        </button>
        <button onClick={handleViewArtists}>
          <p className={`px-4 md:px-8 hover:bg-gunmetal-500 transition-all duration-200 hover:cursor-pointer ${wrappedType === 'artists' ? 'bg-gunmetal-500' : 'bg-gunmetal'}`}>
            Artists
          </p>
        </button>
        {/* <button onClick={handleViewGenres}>
          <p className='px-8 hover:bg-gunmetal-500 transition-all duration-200 hover:cursor-pointer'>Genres</p>
        </button> */}
      </div>
      {(wrappedType && wrappedType !== 'preview') && (
      <div className='w-5/6 md:w-2/3 mx-auto flex flex-row justify-between text-xs md:text-md'>
        <button onClick={handleViewShort}
          className={`px-8 md:px-16 py-1 ${timeRange === 'short' ? 'bg-gunmetal-700' : 'bg-gunmetal'}`}>
          last 4 weeks
        </button>
        <button onClick={handleViewMid}
          className={`px-8 md:px-16 ${timeRange === 'medium' ? 'bg-gunmetal-700' : 'bg-gunmetal'}`}>
          last 6 months
        </button>
        <button onClick={handleViewLong}
          className={`px-8 md:px-16 ${timeRange === 'long' ? 'bg-gunmetal-700' : 'bg-gunmetal '}`}>
          all time
        </button>
      </div>)}
      <div>
        {/* <h1 className='text-lg pb-2'>Your top artist this year is:</h1> */}
        {(!wrappedType || wrappedType === 'preview') && user && <PreviewWrapped token={access_token} user={user} />}
        {wrappedType === 'tracks' && <TracksWrapped token={access_token} time_range={timeRange} />}
        {wrappedType === 'artists' && <ArtistsWrapped token={access_token} time_range={timeRange} />}
        {wrappedType === 'genres' && <GenresWrapped token={access_token} time_range={timeRange} />}
      </div>
    </div>
  )
}

export default Wrapped