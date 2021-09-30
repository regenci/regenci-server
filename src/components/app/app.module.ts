import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { AppController } from './app.controller'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule.forRoot({ cache: true, isGlobal: true, envFilePath: '.env' })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
