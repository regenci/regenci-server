export default () => ({
  api: {
    env: process.env.NODE_ENV,
    prefix: process.env.API_PREFIX,
    port: parseInt(process.env.PORT, 10),
    urls: {
      devUrl: process.env.DEV_URL,
      production: process.env.PROD_URL,
    },
  },

  cors: {
    credentials: true,
    origin: ['http://localhost:3000', process.env.FRONT_COMBINATION_PATTERN],
  },

  jwt: {
    expiresIn: process.env.EXPIRES_IN,
    accessToken: process.env.ACCESS_TOKEN_SECRET,
    refreshToken: process.env.REFRESH_TOKEN_SECRET,
  },

  cookieParser: process.env.COOKIE_PARSER_SECRET,

  session: {
    secret: process.env.SESSION_SECRET,
    name: 'sess',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
  },

  rateLimit: {
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  },
});
