import React from 'react'
import { useState, useEffect } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

const Player = ({ accessToken }) => {
  const [play, setPlay] = useState(false)
  const trackURI = 'https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl'

  useEffect(() => {
    setPlay(true)
  }, [])

  if (!accessToken) return null

  return (
    <div>
      <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      callback={(state) => {
        if (!state.isPlaying) setPlay(false)
      }} 
      play={play}
      uri={[trackURI]}
      magnifySliderOnHover={true}
      />
    </div>
  )
}

export default Player