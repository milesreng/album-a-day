/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { useState, useEffect } from 'react'
import TrackWidget from './TrackWidget'
import ArtistWidget from './ArtistWidget'

import RecommendedTrack from './RecommendedTrack'

const PreviewWrapped = (props) => {
  const [artist, setArtist] = useState()
  const [artists, setArtists] = useState([])
  const [artistTracks, setArtistTracks] = useState([])
  const [recommended, setRecommended] = useState()
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
      const artist = await fetch('https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=5', authParameters)
      .then(response => response.json())

      setArtist(artist.items[0])
      setArtists(artist.items.slice(1,))
      console.log(artists)
    }
    
    fetchData()
    getTopByArtist()
  }, [access_token])

  useEffect(() => {
    if (artist) {
      getRecommendedByArtist()
    }
  }, [artist])

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

  const getRecommendedByArtist = async () => {
    const searchParameters = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + access_token
        }
      }

    const recs = await fetch(`https://api.spotify.com/v1/recommendations?seed_artists=${artist.id}`,
      searchParameters)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setRecommended(data.tracks)
    })
  }

  return (
    <div>
      {artist && (
        <div className='flex flex-col gap-12'>
          <div className='flex flex-row w-3/4 md:w-1/2 mx-auto'>
            <div className='flex flex-col bg-default-bg w-5/6 mx-auto px-8 pt-8 text-center'>
              <div className='text-gunmetal-200'>
                @{props.user.id}
              </div>
              <img className='mx-auto'
                src={artist.images[0].url} alt={artist.name} />
              <div className='text-gunmetal py-4'>
                <p className='text-xl md:text-3xl'>{artist.name}</p>
                <p className='font-header tracking-widest text-lg'>2023</p>
              </div>
            </div>
            <div className='w-1/6 flex flex-col justify-between'>
              {artistTracks && artistTracks.filter(track => track.artists.find(a => a.name === artist.name)).slice(0, 6).map(track => (
                <a key={track.id} href={track.external_urls.spotify} className='h-full'>
                    <img className='my-auto h-full' src={track.album.images[0].url} alt="" />
                </a>
              ))}

            </div>
          </div>
          <div>
            {recommended && (
                <h1 className='text-center mx-auto pb-4 font-content'>Users like you listen to:</h1>
              )}
            <div className='flex flex-wrap w-5/6 mx-auto gap-4 justify-evenly pb-12'>
              
              {recommended && recommended.map(track => (
                <div key={track.id}>
                  <RecommendedTrack track={track} />
                </div>
              ))}
            </div>
              {/* <div className='flex flex-row mx-auto w-3/4 justify-between'>
                {artists && artists.map((artist, idx) => (
                  <ArtistWidget key={artist.id} artist={artist} rank={idx} />
                ))}
              </div>
            <button onClick={getTopByArtist}>your favorite tracks by {artist.name}:</button>
            <div className='flex flex-wrap mx-auto w-11/12 justify-between'>
              {artistTracks && artistTracks.filter(track => track.artists.find(a => a.name === artist.name)).slice(0, 12).map((track, idx) => (
                <TrackWidget key={track.id} track={track} artistID={artist.id} rank={idx+1} />
              ))}
            </div> */}
  
  
          </div>
          </div>
      )}
    </div>
  )
}

export default PreviewWrapped