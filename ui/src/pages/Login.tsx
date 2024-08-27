/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { Link } from "react-router-dom"

const Login = () => {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: any) => {
    e.preventDefault()
  }
  return (
    <div className=" body-container">
      <form onSubmit={handleLogin} className='auth-form'>
        <div className="form-input">
          <label htmlFor="email">Email</label>
          <input 
            type="text"
            value={email}
            name='email'
            onChange={(e: any) => setEmail(e.target.value)} />
        </div>
        <div className="form-input">
          <label htmlFor="password">Password</label>
          <input 
            type="password"
            value={password}
            name='password'
            onChange={(e: any) => setPassword(e.target.value)} />
        </div>
        <div className="submit-button">
          <button type='submit'>Log in</button>
        </div>
        <div className="mx-auto">
          Don&apos;t have an account? Sign up <Link to='/signup' className="link">here.</Link>
        </div>
      </form>
    </div>
  )
}

export default Login