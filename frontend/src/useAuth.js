import { useEffect, useState } from 'react'
import axios from './axios'

export default function useAuth (code) {
  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()

  useEffect(() => {
    axios.post('/api/login', { code }).then((response) => {
      window.history.pushState({}, null, '/')

      setAccessToken(response.data.accessToken)
      setRefreshToken(response.data.refreshToken)
      setExpiresIn(response.data.expiresIn)
    })
    .catch((error) => {
      //   If fail redirect to home page - Login page
      console.log(`error: ${error}`)
    })
   }, [code])

  useEffect(() => {
    if (!refreshToken || !expiresIn) {
      return
    }
  
    let interval = setInterval(() => {
      
      axios.post('/api/refresh', { refreshToken }).then((response) => {
        // console.log(response.data);
        setAccessToken(response.data.accessToken)
        setExpiresIn(response.data.expiresIn)
      })
      .catch(() => {
        window.location = '/'
      })
  
    }, (expiresIn - 60) * 1000 )  // 1 min before expire Time and multiplying it with 1000 becoz to convert it in miliseconds
  
    // This will make sure that if for some reason our refreshtoken or expireTime changes before an actual Refresh then it will clear the interval so that we don't use the incorrect expireTime or refreshtoken
    return () => clearInterval(interval)
  
  }, [refreshToken, expiresIn])

  return accessToken
}