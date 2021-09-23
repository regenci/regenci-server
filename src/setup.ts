import hpp from 'hpp'
import config from './config'
import fastifyCookie from 'fastify-cookie'
import fastifyHelmet from 'fastify-helmet'
import compression from 'fastify-compress'
import { HttpStatus, ValidationPipe } from '@nestjs/common'
import { NestFastifyApplication } from '@nestjs/platform-fastify'

export function setup(app: NestFastifyApplication): NestFastifyApplication {
  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    })
  )

  // Setting the global api prefix ex: http://example.com/"prefix/api"
  app.setGlobalPrefix(config().api.prefix)

  // Express middleware to protect against HTTP Parameter Pollution attacks
  app.use(hpp())

  // Helmet helps you secure your Express apps by setting various HTTP headers.
  app.register(fastifyHelmet)

  // Decreases the downloadable amount of data that's served to users.
  // Through the use of this compression, we can improve the performance of our Node api
  app.register(compression)

  // cookie parser
  app.register(fastifyCookie, {
    secret: config().secrets.cookieParser, // for cookies signature
  })

  // Enables Cross Origin Resource Sharing to the specified array of origins
  app.enableCors({ origin: ['http://localhost:3000', /\.regenci\.online$/], credentials: true })

  return app
}
