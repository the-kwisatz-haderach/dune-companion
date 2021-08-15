import { useContext } from 'react'
import { SnackbarProvider, SnackbarContext } from './SnackbarContext'

export { SnackbarProvider }

export default function useSnackBarContext() {
  return useContext(SnackbarContext)
}
