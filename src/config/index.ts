export default () => ({
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10),

  secrets: {
    signup: process.env.JWT_SIGNUP_SECRET,
    cookieParser: process.env.COOKIE_PARSER_SECRET,
  },

  api: {
    prefix: process.env.API_PREFIX,
  },
  /**
   * Sendgrid email credentials
   */
  mailer: {
    apiKey: process.env.SENDGRID_API_KEY,
    templates: {
      reset: process.env.SENDGRID_RESET_TEMPLATE_ID,
      register: process.env.SENDGRID_REGISTER_TEMPLATE_ID,
    },
  },
})
