export default () => ({
  env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10),
  api: {
    prefix: process.env.API_PREFIX,
    // keys: {
    //   IP: process.env.IP_API_KEY,
    //   sendgrid: process.env.SENDGRID_API_KEY,
    // },
  },
  // url: {
  //   devUrl: process.env.DEV_URL,
  //   production: process.env.PROD_URL,
  // },
  cors_settings: {
    credentials: true,
    origin: ['http://localhost:3000', process.env.FRONT_COMBINATION_PATTERN],
  },
  // jwt_settings: {
  //   expiresIn: process.env.EXPIRES_IN,
  //   secret: process.env.JWT_SECRET,
  // },
  cookie_parser: {
    secret: process.env.COOKIE_PARSER_SECRET,
  },
  session_settings: {
    secret: process.env.SESSION_SECRET,
    name: 'sess',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
  },
  rate_limit_settings: {
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  },
  // sendgrid: {
  //   templates: {
  //     reset: process.env.SENDGRID_RESET_TEMPLATE_ID,
  //     register: process.env.SENDGRID_REGISTER_TEMPLATE_ID,
  //   },
  //   from: {
  //     verify: 'no-reply@regenci.online',
  //     reset: 'support@regenci.online',
  //   },
  // },
});
