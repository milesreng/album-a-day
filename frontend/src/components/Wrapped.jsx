/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useState, useEffect } from 'react'
import Header from './Header'
import TopArtist from './TopArtist'

const Wrapped = (props) => {
  const [user, setUser] = useState()
  const [topTracks, setTopTracks] = useState([])
  const [topArtists, setTopArtists] = useState([])

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
  }, [access_token])

  const getTopByArtist = () => {

  }

  // const getWrapped = async () => {

  // }

  return (
    <div className='bg-gunmetal'>
      {user && <Header user={user} />}
      <div>
        {/* <h1 className='text-lg pb-2'>Your top artist this year is:</h1> */}
        <TopArtist token={access_token} />
      </div>
    </div>
  )
}

export default Wrapped