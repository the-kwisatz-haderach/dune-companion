export const config = {
  HTTP_PORT: process.env.PORT || 8000,
  REDIS_URL:
    process.env.REDIS_URL ||
    `redis://${
      process.env.NODE_ENV === 'production' ? 'redis' : 'localhost'
    }:6379`,
  SESSION_SECRET: 'secrets'
}
