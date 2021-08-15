import {
  Button,
  createStyles,
  IconButton,
  makeStyles,
  Snackbar
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

type SnackOptions = {
  type: 'error' | 'success' | 'info'
}

type ISnackbarContext = {
  showSnack: (message: string, options?: SnackOptions) => void
}

export interface SnackbarMessage {
  message: string
  options?: SnackOptions
  key: number
}

export const SnackbarContext = createContext<ISnackbarContext>({
  showSnack: () => {}
})

const useStyles = makeStyles(theme =>
  createStyles({
    close: {
      padding: theme.spacing(0.5)
    }
  })
)

export const SnackbarProvider: React.FC = ({ children }) => {
  const classes = useStyles()
  const [snackPack, setSnackPack] = useState<SnackbarMessage[]>([])
  const [open, setOpen] = useState(false)
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(
    undefined
  )

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
    (message, options) => {
      setSnackPack(prev => [
        ...prev,
        { message, key: new Date().getTime(), options }
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
      <div>
        {children}
        <Snackbar
          key={messageInfo ? messageInfo.key : undefined}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          onExited={handleExited}
          message={messageInfo ? messageInfo.message : undefined}
          action={
            <>
              <Button color="secondary" size="small" onClick={handleClose}>
                CLOSE
              </Button>
              <IconButton
                aria-label="close"
                color="inherit"
                className={classes.close}
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            </>
          }
        />
      </div>
    </SnackbarContext.Provider>
  )
}
