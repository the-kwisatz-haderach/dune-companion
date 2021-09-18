export type SnackType = 'error' | 'success' | 'info' | 'warning'

export type ISnackbarContext = {
  showSnack: (message: string, options?: SnackOptions) => void
}

export interface SnackOptions {
  autoHideDuration?: number
  type?: SnackType
}

export interface SnackbarMessage extends SnackOptions {
  message: string
  key: number
}
