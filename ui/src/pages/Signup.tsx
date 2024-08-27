import { useState } from "react"

const Signup = () => {

  const [email ,setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className='body-container'>
      <form action='' className='auth-form'>
        {/* <a href={authUrl}>sign up with spotify</a> */}
        <div className="form-input">
          <label htmlFor="email">Email</label>
          <input 
            type="text"
            value={email}
            name='email'
            onChange={(e: any) => setEmail(e.target.value)} />
        </div>
        <div className="form-input">
          <label htmlFor="email">Name</label>
          <input 
            type="text"
            value={email}
            name='email'
            onChange={(e: any) => setEmail(e.target.value)} />
        </div>
        <div className="form-input">
          <label htmlFor="email">Email</label>
          <input 
            type="text"
            value={email}
            name='email'
            onChange={(e: any) => setEmail(e.target.value)} />
        </div>
      </form>
    </div>
  )
}

export default Signup