import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { ISnackbarContext, SnackbarMessage } from './types'
import { useStyles } from './useStyles'

export const SnackbarContext = createContext<ISnackbarContext>({
  showSnack: () => {}
})

export const SnackbarProvider: React.FC = ({ children }) => {
  const [snackPack, setSnackPack] = useState<SnackbarMessage[]>([])
  const [open, setOpen] = useState(false)
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(
    undefined
  )
  const classes = useStyles({ type: messageInfo?.type })

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] })
      setSnackPack(prev => prev.slice(1))
      setOpen(true)
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false)
    }
  }, [snackPack, messageInfo, open])

  const showSnack = useCallback<ISnackbarContext['showSnack']>(
    (message, type) => {
      setSnackPack(prev => [
        ...prev,
        { message, key: new Date().getTime(), type }
      ])
    },
    []
  )

  const handleClose = (
    _: React.SyntheticEvent | MouseEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const handleExited = () => {
    setMessageInfo(undefined)
  }

  const value = useMemo<ISnackbarContext>(
    () => ({
      showSnack
    }),
    [showSnack]
  )

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <>
        {messageInfo && (
          <Snackbar
            key={messageInfo.key}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            TransitionProps={{
              onExited: handleExited
            }}
          >
            <Alert
              elevation={6}
              variant="filled"
              onClose={handleClose}
              severity={messageInfo?.type ?? 'info'}
              className={classes.alert}
            >
              {messageInfo.message}
            </Alert>
          </Snackbar>
        )}
      </>
    </SnackbarContext.Provider>
  )
}
