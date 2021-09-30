import { setup } from './setup'
import { config } from './config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './components/app'
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
