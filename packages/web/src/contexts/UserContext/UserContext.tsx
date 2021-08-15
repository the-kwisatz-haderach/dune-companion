import { useState } from 'react'
import { useCallback } from 'react'
import { useMemo } from 'react'
import { createContext } from 'react'
import useSnackBarContext from '../SnackbarContext'

type IUserContext = {
  isAuthenticated: boolean
  username: string
  authenticate: () => void
}

export const UserContext = createContext<IUserContext>({
  isAuthenticated: false,
  username: '',
  authenticate: () => {}
})

export const UserProvider: React.FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { showSnack } = useSnackBarContext()
  const [username, setUsername] = useState('')

  const authenticate = useCallback(() => {
    setIsAuthenticated(true)
    setUsername('Test')
    showSnack("You're now logged in as Test")
  }, [showSnack])

  const value: IUserContext = useMemo(
    () => ({
      username,
      isAuthenticated,
      authenticate
    }),
    [username, authenticate, isAuthenticated]
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
