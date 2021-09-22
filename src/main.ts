import hpp from 'hpp'
import config from './config'
import { AppModule } from './modules'
import { NestFactory } from '@nestjs/core'
import { PrismaService } from './services'
import compression from 'fastify-compress'
import { fastifyHelmet } from 'fastify-helmet'
import { ValidationPipe } from '@nestjs/common'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.enableCors({ origin: ['http://localhost:3000', /\.regenci\.online$/], credentials: true })

  // Express middleware to protect against HTTP Parameter Pollution attacks
  app.use(hpp())

  // Helmet helps you secure your Express apps by setting various HTTP headers.
  app.register(fastifyHelmet)

  // Decreases the downloadable amount of data that's served to users.
  // Through the use of this compression, we can improve the performance of our Node api
  app.register(compression)

  // Fixing prisma issue with enableShutdownHooks
  const prismaService: PrismaService = app.get(PrismaService)
  prismaService.enableShutdownHooks(app)

  // Setting the global api prefix ex: http://example.com/"prefix/api"
  app.setGlobalPrefix(config().api.prefix)

  // Automatically validates incoming requests
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(config().port, '0.0.0.0', () => {
    console.info(`
      ################################################
      🛡️  Server listening on port: ${config().port} 🛡️
      ################################################
    `)
  })
}
bootstrap()
