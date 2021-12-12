import { setup } from './setup';
import { config } from './config';
import { AppModule } from './app';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  // Initializing all the middlewares
  setup(app);

  await app.listen(config().api.port, () => {
    console.info(`
      ################################################
      🛡️  Server listening on port: ${config().api.port} 🛡️
      ################################################
    `);
  });
}
bootstrap();
