/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Lineup = ({ user, artists }) => {
  const OPENAI_KEY = import.meta.env.VITE_OPENAI_API_KEY
  const OPENAI_ENDPOINT = import.meta.env.VITE_OPENAI_API_ENDPOINT

  const [aiResponse, setAiResponse] = useState()

  const artistNames = artists.map(artist => artist.name)

  useEffect(() => {

    const fetchData = async () => {
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          prompt: `Complete this sentence: "hello my name is"`,
          model: 'gpt-3.5-turbo',
          max_tokens: 50,
          n: 1,
          stop: ".",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_KEY}`,
          },
        }
      );
    
      return response.data.choices[0].text
    };

    // const getToken = async () => {
    //   const payload = {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: 'Bearer ' + OPENAI_KEY
    //     },
    //     body: new URLSearchParams({
    //       prompt: `Give me a festival name for the following artists:`,
    //       model: 'text-davinci-003',
    //       max_tokens: 50,
    //       n: 1,
    //       stop: "."
    //     })
    //   }

    //   console.log(payload)
  
    //   const response = await fetch(OPENAI_ENDPOINT, payload)
  
    //   console.log(response)
    // }

    // fetchData()
  }, [artists])

  return (
    <div>
      {aiResponse && (
        <p>{aiResponse}</p>
      )}
      <div className={`w-[380px] sm:w-[450px] md:w-[600px] mx-auto aspect-square uppercase flex flex-col tracking-widest font-header bg-default-bg gap-2 md:gap-6 pt-4 md:pt-12 px-2 ${aiResponse ? 'text-gunmetal-400' : 'text-gunmetal'}`}>
        <div className='text-2xl text-center lowercase font-content'>
          {aiResponse ? '' : `${user.display_name}'s Festival`}
        </div>
        <div className='text-5xl md:text-6xl text-center'>
          {artists[0].name}
        </div>
        <div className='flex flex-wrap md:flex-row text-center justify-evenly text-2xl md:text-4xl'>
          {artists.slice(1,4).map(artist => (
            <div key={artist.id}>
              {artist.name}
            </div>
          ))}
        </div>
        <div className='text-[16px] sm:text-[22px] md:text-[28px] flex flex-wrap flex-row gap-0 md:gap-4 text-center justify-evenly  lowercase tracking-tight md:w-11/12 mx-auto'>
          {artists.slice(5,21).map(artist => (
            <div key={artist.id} className='py-1 px-2'>
              {artist.name}
            </div>
          ))}
        </div>
      <div className=' bg-default-bg text-gunmetal-400 text-center text-xs underline py-2'>
          <a href='https://wrappedpreview.netlify.app'>
            https://wrappedpreview.netlify.app
          </a>
      </div>
      </div>
    </div>
  )
}

export default Lineup