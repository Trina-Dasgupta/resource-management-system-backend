export const appConfig = {
  port: parseInt(process.env.AUTH_SERVICE_PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    expiresIn: process.env.JWT_EXPIRATION || '7d',
  },
  database: {
    url: process.env.DATABASE_URL,
  },
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  },
};
