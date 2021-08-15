export type SnackType = 'error' | 'success' | 'info' | 'warning'

export type ISnackbarContext = {
  showSnack: (message: string, type?: SnackType) => void
}

export interface SnackbarMessage {
  message: string
  type?: SnackType
  key: number
}
