import { setup } from './setup'
import { AppModule } from './components'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
  const config = app.get(ConfigService)

  // Initializing all the middlewares
  setup(app)

  await app.listen(config.get('port'), () => {
    console.info(`
      ################################################
      🛡️  Server listening on port: ${config.get('port')} 🛡️
      ################################################
    `)
  })
}
bootstrap()
