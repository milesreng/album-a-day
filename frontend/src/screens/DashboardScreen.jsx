import React from 'react'
import useAuth from '../useAuth'
import Player from '../components/Player'

const code = new URLSearchParams(window.location.search).get('code')

const DashboardScreen = () => {
  const accessToken = useAuth(code)
  // const [playingTrack, setPlayingTrack] = useContext()

  return (
    <div className='h-full w-full'>
      { accessToken }
      {/* <Player accessToken={accessToken} /> */}
    </div>
  )
}

export default DashboardScreen