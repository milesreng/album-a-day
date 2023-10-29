/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { useState, useEffect } from 'react'
import Separator from '../assets/point-gunmetal.svg'

import refresh from '../assets/refresh-light.svg'
import RecommendedTrack from './RecommendedTrack'

const PreviewWrapped = (props) => {
  const [artist, setArtist] = useState()
  const [artists, setArtists] = useState([])
  const [artistTracks, setArtistTracks] = useState([])
  const [recommended, setRecommended] = useState()
  const access_token = props.token

  useEffect(() => {

    const fetchData = async () => {
      const authParameters = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + access_token
        }
      }

      const artist = await fetch('https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=5', authParameters)
      .then(response => response.json())
      .catch(error => console.log(error.message))

      setArtist(artist.items[0])
      setArtists(artist.items.slice(1,))
    }
    
    fetchData()
    getTopByArtist()
  }, [])

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
        setRecommended(data.tracks)
    })
  }

  // const handleRefreshRecs = () => {
  //   getRecommendedByArtist()
  // }

  return (
    <div>
      {artist && (
        <div className='flex flex-col gap-12'>
          <div className='flex flex-row w-11/12 md:w-1/2 mx-auto'>
            <div className='flex flex-col bg-default-bg pt-8 pb-2 w-full sm:w-5/6 mx-auto px-8 text-center'>
              <img className='mx-auto'
                src={artist.images[0].url} alt={artist.name} />
              <div className='text-gunmetal'>
                <p className='text-xl md:text-3xl text-content uppercase pt-4 pb-2'>{artist.name}</p>
                <div className='text-[10px] sm:text-[12px] flex flex-col my-auto text-gunmetal pb-4'>
                  <div className='flex flex-row justify-evenly w-11/12 mx-auto'>
                    {artistTracks && artistTracks.filter(track => track.artists.find(a => a.name === artist.name)).slice(0,3).map((track, idx) => (
                      <div key={track.id} className='flex flex-row text-center align-middle'>
                        <p className='text-center uppercase tracking-wide font-content md:font-bold my-auto truncate'>
                          {track.name.split('-')[0].split('(')[0]}
                        </p>
                      {/* {idx != 2 && (
                      <img className='w-2'
                        src={Separator} alt="" />
                    )} */}
                      </div>
                    ))}
                  </div>
                  <div className='flex flex-row justify-evenly w-11/12 mx-auto'>
                  {artistTracks && artistTracks.filter(track => track.artists.find(a => a.name === artist.name)).slice(3,5).map((track, idx) => (
                    <div key={track.id} className='flex flex-row text-center align-middle'>
                      <p className='text-center uppercase tracking-wide font-content md:font-bold my-auto truncate'>
                        {track.name.split('-')[0].split('(')[0]}
                      </p>
                    </div>
                  ))}

                  </div>

                </div>
              </div>
            </div>
            {/* <div className='w-1/6 flex flex-col justify-between'>
              {artistTracks && artistTracks.filter(track => track.artists.find(a => a.name === artist.name)).slice(0, 5).map(track => (
                <TopArtistTrack key={track.id} track={track} />
              ))}
            </div> */}
          </div>
          <div>
            {/* {recommended && (
              <div className='flex flex-row gap-0'>
                <h1 className='text-center mx-auto pb-8 font-content flex flex-row gap-8'>
                  <button onClick={handleRefreshRecs}>
                  <img 
                    className='w-4 mx-auto'
                    src={refresh} alt='refresh' />
                  </button>
                  Users like you listen to...
                </h1>
              </div>
              )} */}
            <div className='flex flex-col w-5/6 mx-auto gap-4 justify-evenly pb-12'>
              
              {recommended && recommended.map(track => (
                <div key={track.id}>
                  <RecommendedTrack track={track} />
                </div>
              ))}
            </div>
          </div>
          </div>
      )}
    </div>
  )
}

export default PreviewWrapped