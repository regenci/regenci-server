export default (): Record<string, unknown> => ({
  api: {
    devUrl: process.env.DEV_URL,
    prodUrl: process.env.PROD_URL,
    prefix: process.env.API_PREFIX,
    ipApiKey: process.env.IP_API_KEY,
    baseUrl: process.env.FRONTEND_BASE_URL,
  },
  env: process.env.NODE_ENV,
  server: {
    port: parseInt(process.env.PORT, 10),
    baseUrl: process.env.BASE_URL,
  },
  cors: {
    // https://github.com/expressjs/cors#configuration-options
    credentials: true,
    origin: ['http://localhost:3000', process.env.FRONT_COMBINATION_PATTERN],
  },
  jwt: {
    expiresIn: process.env.EXPIRES_IN,
    secret: process.env.JWT_SECRET,
  },
  cookie: {
    // https://github.com/expressjs/cookie-session#options
    secret: process.env.COOKIE_SESSION_SECRET,
    name: 'sess',
    // cookie options
    // https://github.com/pillarjs/cookies#cookiesset-name--value---options--
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
  },
  cookieParser: {
    secret: process.env.COOKIE_PARSER_SECRET,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl: process.env.GOOGLE_CALLBACK_URL,
  },
  facebook: {
    appId: process.env.FACEBOOK_APP_ID,
    appSecret: process.env.FACEBOOK_APP_SECRET,
    callbackUrl: process.env.FACEBOOK_CALLBACK_URL,
  },
  github: {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackUrl: process.env.GITHUB_CALLBACK_URL,
  },
  twitter: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackUrl: process.env.TWITTER_CALLBACK_URL,
  },
  rateLimit: {
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  },
  email: {
    sendGridApiKey: process.env.SENDGRID_API_KEY,
    templates: {
      reset: process.env.SENDGRID_RESET_TEMPLATE_ID,
      register: process.env.SENDGRID_REGISTER_TEMPLATE_ID,
    },
    domain: process.env.SENDGRID_DOMAIN,
    from: {
      verify: 'no-reply@regenci.online',
      reset: 'support@regenci.online',
    },
  },
})
