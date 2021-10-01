import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { AppController } from './app.controller'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [ConfigModule.forRoot({ cache: true, isGlobal: true, envFilePath: '.env' }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
