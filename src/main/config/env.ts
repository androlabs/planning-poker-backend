export const env = {
  domain: process.env.DOMAIN ?? 'http://localhost',
  port: process.env.PORT ?? 3000,
  jwtSecret: process.env.JWT_SECRET ?? 'abc',
};
