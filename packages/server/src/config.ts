export const config = {
  HTTP_PORT: process.env.PORT || 8000,
  REDIS_PORT: 6379,
  WEBSOCKET_HOST: 'localhost',
  REDIS_URL: process.env.REDIS_URL || 'redis',
  SESSION_SECRET: 'secrets'
}
