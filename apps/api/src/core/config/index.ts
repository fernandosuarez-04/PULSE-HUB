export const config = {
  port: process.env.PORT || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
  apiVersion: process.env.API_VERSION || 'v1',
  jwt: {
    secret: process.env.JWT_SECRET || 'default-secret-change-me',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshSecret:
      process.env.REFRESH_TOKEN_SECRET || 'default-refresh-secret-change-me',
    refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '30d',
  },
  cors: {
    allowedOrigins:
      process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  },
};

