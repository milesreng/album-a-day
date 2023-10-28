/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { useState, useEffect } from 'react'
import Separator from '../assets/point-gunmetal.svg'

import refresh from '../assets/refresh-light.svg'
import RecommendedTrack from './RecommendedTrack'
import TopArtistTrack from './TopArtistTrack'

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
          <div className='flex flex-row w-5/6 md:w-1/2 mx-auto'>
            <div className='flex flex-col bg-default-bg w-5/6 mx-auto px-8 text-center'>
              <p className='text-gunmetal-200 my-auto'>
                @{props.user.id}
              </p>
              <img className='mx-auto'
                src={artist.images[0].url} alt={artist.name} />
              <div className='text-gunmetal'>
                <p className='text-xl md:text-3xl text-content uppercase pt-4 pb-2'>{artist.name}</p>
                <div className='flex flex-col my-auto text-gunmetal text-xs pb-4'>
                  <div className='flex flex-row justify-evenly w-11/12 mx-auto'>
                    {artistTracks && artistTracks.filter(track => track.artists.find(a => a.name === artist.name)).slice(0,3).map((track, idx) => (
                      <><div key={track.id} className='flex flex-row text-center align-middle'>
                        <p className='text-center uppercase tracking-wide font-content md:font-bold my-auto truncate'>
                          {track.name.split('-')[0].split('(')[0]}
                        </p>
                      </div>
                      {idx != 2 && (
                      <img className='w-2'
                        src={Separator} alt="" />
                    )}
                      </>
                    ))}
                  </div>
                  <div className='flex flex-row justify-evenly w-11/12 mx-auto'>
                  {artistTracks && artistTracks.filter(track => track.artists.find(a => a.name === artist.name)).slice(3,5).map((track, idx) => (
                    <><div key={track.id} className='flex flex-row text-center align-middle'>
                      <p className='text-center uppercase tracking-wide font-content md:font-bold text-xs my-auto truncate'>
                        {track.name.split('-')[0].split('(')[0]}
                      </p>
                    </div>
                    {idx != 1 && (
                      <img className='w-2'
                        src={Separator} alt="" />
                    )}
                    </>
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