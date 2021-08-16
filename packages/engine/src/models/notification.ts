export type NotificationType = 'error' | 'success' | 'info' | 'warning'

export type Notification = {
  message: string
  type: NotificationType
}
