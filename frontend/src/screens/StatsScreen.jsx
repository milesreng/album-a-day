import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

import Header from '../components/Header'

const StatsScreen = () => {
  const navigate = useNavigate()

  const [accessToken, setAccessToken] = useState()
  
  const [user, setUser] = useState()

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      setAccessToken(localStorage.getItem('access_token'))
    } else {
      navigate('/')
    }
  }, [])

  useEffect(() => {

    const authParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }

    const fetchData = async () => {
      const user = await fetch('https://api.spotify.com/v1/me', authParameters)
      .then(response => response.json())
      .catch(error => console.log(error.message))

      setUser(user)
    }

    if (accessToken) {
      fetchData()
    }
  }, [accessToken])

  return (
    <div>
      {user && <Header user={user} />}
    </div>
  )
}

export default StatsScreen