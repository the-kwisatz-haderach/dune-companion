import { useContext } from 'react'
import { UserProvider, UserContext } from './UserContext'

export { UserProvider }

export default function useUserContext() {
  return useContext(UserContext)
}
