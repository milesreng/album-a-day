import React from 'react'
import { useRouteError } from 'react-router'

const ErrorScreen = () => {
  const error = useRouteError()
  console.log(error)

  return (
    <div className='h-screen'>
      {error.data}
    </div>
  )
}

export default ErrorScreen