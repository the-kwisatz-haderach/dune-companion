export const config = {
  HTTP_PORT: process.env.PORT || 8000,
  REDIS_URL: process.env.REDIS_URL || 'redis://redis:6379',
  SESSION_SECRET: 'secrets'
}
