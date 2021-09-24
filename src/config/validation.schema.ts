import * as Joi from '@hapi/joi'

export default Joi.object({
  NODE_ENV: Joi.string(),
  PORT: Joi.number().default(3000),
  BaseSE_URL: Joi.string().default('http://localhost:3000'),

  // JWT
  EXPIRES_IN: Joi.string().default('1d'),
  JWT_SECRET: Joi.string().required(),

  // Google
  GOOGLE_CLIENT_ID: Joi.string(),
  GOOGLE_CLIENT_SECRET: Joi.string(),
})
