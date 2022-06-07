import * as dotenv from 'dotenv';
dotenv.config();

export const env = {
  app: {
    domain: process.env.DOMAIN ?? 'http://localhost',
    port: process.env.PORT ?? 3000,
    runtime: process.env.NODE_ENV,
  },
  secrets: {
    jwt: process.env.JWT_SECRET ?? 'abc',
    secretInvites: process.env.SECRET_INVITES,
    expirationToken: '7 day',
    saltRounds: process.env.SALTS_ROUNDS || 10,
  },
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
};
