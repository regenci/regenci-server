require('module-alias/register')
import hpp from 'hpp'
import config from './config'
import helmet from 'helmet'
import { is_dev } from './utilities'
import { AppModule } from './modules'
import compression from 'compression'
import { NestFactory } from '@nestjs/core'
import { OpticMiddleware } from '@useoptic/express-middleware'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.enableCors({ origin: ['http://localhost:3000', /\.regenci\.online$/], credentials: true })

  // Express middleware to protect against HTTP Parameter Pollution attacks
  app.use(hpp())

  // Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
  app.use(helmet())

  // Decreases the downloadable amount of data that's served to users.
  // Through the use of this compression, we can improve the performance of our Node api
  app.use(compression())

  // API Documentation
  app.use(
    OpticMiddleware({
      enabled: is_dev(),
    })
  )

  app.setGlobalPrefix(config().api.prefix)

  await app.listen(config().port, () => {
    console.info(`
      ################################################
      🛡️  Server listening on port: ${config().port} 🛡️
      ################################################
    `)
  })
}
bootstrap()
