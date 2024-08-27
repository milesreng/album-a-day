import { useState, createContext, useContext, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

export const AuthContext = createContext({
  user: {},
  setUser: () => {},
  fetchUser: () => {},
  login: () => {},
  logout: () => {},
  isLoading: false
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const login = async () => {
    setIsLoading(true)

    try {
      const res = await fetch('/api/auth/spotify', {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })

      if (res.status == 200) {
        setUser(await res.json())
      }
    } catch (error: any) {
      if (error) console.log(error)
    }

    setIsLoading(false)
  }

  const logout = async () => {

  }

  const fetchUser = async () => {
    setIsLoading(true)

    try {
      const res = await fetch('/api/auth/user')

      if (res.status == 200) {
        setUser(await res.json())
      }
    } catch (error: any) {
      if (error) console.log(error)
    }

    setIsLoading(false)
  }

  const context = { user, setUser, fetchUser, login, logout, isLoading }

  return (
    <AuthContext.Provider value={ context }>
      { children }
    </AuthContext.Provider>
  )
}