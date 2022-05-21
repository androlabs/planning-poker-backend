import * as dotenv from 'dotenv';
dotenv.config();

export const env = {
  app: {
    domain: process.env.DOMAIN ?? 'http://localhost',
    port: process.env.PORT ?? 3000,
  },
  secrets: {
    jwt: process.env.JWT_SECRET ?? 'abc',
  },
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
};
