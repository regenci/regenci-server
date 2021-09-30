import { NestFactory } from '@nestjs/core'
import { AppModule } from '@server/components/app'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
  await app.listen(3000)
}
bootstrap()
