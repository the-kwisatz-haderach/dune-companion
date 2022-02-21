export const config = {
  HOST_URL:
    process.env.NODE_ENV === 'production'
      ? window.location.origin.replace(/^http/, 'ws')
      : 'ws://localhost:8000'
} as const
