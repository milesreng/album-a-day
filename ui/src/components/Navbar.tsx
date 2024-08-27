import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {

  const { login } = useAuth()

  const handleSpotifyLogin = async () => {
    login()
  }

  return (
    <div className='w-screen min-h-screen flex flex-col'>
      <div className='navbar fixed'>
        <div className='navbar-component'>
          <Link to='/'>Album a Day</Link>
        </div>
        <div className='flex gap-8 navbar-right'>
          <button onClick={handleSpotifyLogin}>login with spotify</button>
          <Link to='/login' className='navbar-link'>Log in</Link>
          <Link to='/signup' className='navbar-link'>Sign up</Link>
        </div>
      </div>
      <div className='my-auto h-screen pt-12'>
        <Outlet />
      </div>
    </div>
  )
}

export default Navbar