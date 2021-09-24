import hpp from 'hpp'
import { randomBytes } from 'crypto'
import fastifyCors from 'fastify-cors'
import fastifyCookie from 'fastify-cookie'
import cookieSession from 'cookie-session'
import fastifyHelmet from 'fastify-helmet'
import compression from 'fastify-compress'
import rateLimit from 'fastify-rate-limit'
import { ConfigService } from '@nestjs/config'
import { NextFunction, Response } from 'express'
import { NestFastifyApplication } from '@nestjs/platform-fastify'

export function setup(app: NestFastifyApplication): NestFastifyApplication {
  const config = app.get(ConfigService)

  // Setting the global api prefix ex: http://example.com/"prefix/api"
  app.setGlobalPrefix(config.get('api.prefix'))

  // Express middleware to protect against HTTP Parameter Pollution attacks
  app.use(hpp())

  // Helmet helps you secure your Express apps by setting various HTTP headers.
  app.register(fastifyHelmet)

  // Enables Cross Origin Resource Sharing to the specified array of origins
  app.register(fastifyCors, config.get('cors'))

  // Rate-limiting is a common technique to protect applications from brute-force attacks.
  app.register(rateLimit, config.get('rateLimit'))

  // Decreases the downloadable amount of data that's served to users.
  // Through the use of this compression, we can improve the performance of our Node api
  app.register(compression)

  // cookie parser
  app.register(fastifyCookie, {
    secret: config.get('cookieParser.secret'), // for cookies signature
  })

  // initializing a cookie session
  app.use(cookieSession(config.get('cookie')))

  app.use((req, _res: Response, next: NextFunction) => {
    req.session.id = req?.session?.id ? req.session.id : randomBytes(32)
    next()
  })
  return app
}
