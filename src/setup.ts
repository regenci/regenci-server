import hpp from 'hpp'
import { config } from './config'
import fastifyCors from 'fastify-cors'
import fastifyCookie from 'fastify-cookie'
import fastifyHelmet from 'fastify-helmet'
import compression from 'fastify-compress'
import rateLimit from 'fastify-rate-limit'
import fastifySession from '@fastify/session'
import { NestFastifyApplication } from '@nestjs/platform-fastify'

export function setup(app: NestFastifyApplication): NestFastifyApplication {
  // Setting the global api prefix ex: http://example.com/"prefix/api"
  app.setGlobalPrefix(config().api.prefix)

  // Express middleware to protect against HTTP Parameter Pollution attacks
  app.use(hpp())

  // Helmet helps you secure your Express apps by setting various HTTP headers.
  app.register(fastifyHelmet)

  // Enables Cross Origin Resource Sharing to the specified array of origins
  app.register(fastifyCors, config().cors_settings)

  // Rate-limiting is a common technique to protect applications from brute-force attacks.
  app.register(rateLimit, config().rate_limit_settings)

  // Decreases the downloadable amount of data that's served to users.
  // Through the use of this compression, we can improve the performance of our Node api
  app.register(compression)

  // cookie parser
  app.register(fastifyCookie, {
    secret: config().cookie_parser.secret, // for cookies signature
  })

  // Initializing a fastify session
  app.register(fastifySession, config().session_settings)

  return app
}
