import config from './config'
import { setup } from './setup'
import { AppModule } from './modules'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())

  // Initializing all the middlewares
  setup(app)

  await app.listen(config().port, () => {
    console.info(`
      ################################################
      🛡️  Server listening on port: ${config().port} 🛡️
      ################################################
    `)
  })
}
bootstrap()
